import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextAuth";

// Set up PostgreSQL connection using pg Pool

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
