import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await pool.connect();
        try {
          const userQuery = `SELECT * FROM users WHERE email = $1`;
          const result = await client.query(userQuery, [credentials?.email]);

          const user = result.rows[0];
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isValid = await bcrypt.compare(
            credentials?.password as string,
            user.password as string
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }

          return { id: user.id, role: user.role, email: user.email };
        } finally {
          client.release();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  jwt: {
    //secret:process.env.NEXTAUTH_SECRET,
    //you can get here the roles
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const client = await pool.connect();
        try {
          const userQuery = `SELECT * FROM users WHERE provider = $1 AND provider_id = $2`;
          const result = await client.query(userQuery, [
            account.provider,
            account.providerAccountId,
          ]);

          let existingUser = result.rows[0];

          if (!existingUser) {
            // Insert new social user
            const insertUserQuery = `
              INSERT INTO users (provider_email, provider, provider_id, password, created_at)
              VALUES ($1, $2, $3, $4, NOW())
              RETURNING id, email;
`;

            const insertResult = await client.query(insertUserQuery, [
              profile?.email,
              account.provider,
              account.providerAccountId,
              "oauth_password", // Placeholder password for OAuth users
            ]);

            existingUser = insertResult.rows[0];
          }

          user.id = existingUser.id;
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        } finally {
          client.release();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
