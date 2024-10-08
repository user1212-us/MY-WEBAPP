import { NextResponse } from "next/server";
import pool from "@/lib/db";
export const dynamic = "force-dynamic"; // Next.js 13+ feature to disable static caching

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM signal_history ORDER BY created_at DESC"
    );
    client.release();
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching signal history, error: " + err },
      { status: 500 }
    );
  }
}
