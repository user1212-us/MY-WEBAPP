import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/lib/emailService";
import pool from "@/lib/db";
import { resendForgotSchema } from "@/types/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    resendForgotSchema.parse(body);
    const { email } = body;
    const client = await pool.connect();
    // Check if the email exists in the users table
    const result = await client.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    const userId = result.rows[0].id;
    const token = uuidv4();

    // Store token and expiry in reset_tokens table
    await pool.query(
      `INSERT INTO resettokens (userid, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '1 hour')`,
      [userId, token]
    );

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/forgot-password/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `You requested a password reset. Click the link to reset your password: ${resetUrl}`
    );

    return NextResponse.json(
      { message: "Password reset email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in password reset request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
