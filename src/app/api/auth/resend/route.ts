import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emailService";
import pool from "@/lib/db";
import { resendForgotSchema } from "@/types/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    resendForgotSchema.parse(body);
    const { email } = body;
    const client = await pool.connect();
    // Check if the email exists in the pending_users table
    const pendingUser = await client.query(
      `SELECT * FROM pendingusers WHERE email = $1`,
      [email]
    );

    if (pendingUser.rows.length === 0) {
      return NextResponse.json(
        { error: "No pending user found for this email." },
        { status: 404 }
      );
    }

    // Generate a new verification code
    const verificationCode = uuidv4().slice(0, 6).toUpperCase();

    // Update the verification code for the pending user
    await client.query(
      `
        UPDATE pendingusers SET verification_code = $1, created_at = NOW() WHERE email = $2
      `,
      [verificationCode, email]
    );

    // Send the email with the new verification code
    await sendEmail(
      email,
      "Your Resent Verification Code",
      `Your verification code is: ${verificationCode}`
    );

    return NextResponse.json(
      { message: "Verification code resent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resending verification code:", error);
    return NextResponse.json(
      { error: "An error occurred while resending the code." },
      { status: 500 }
    );
  }
}
