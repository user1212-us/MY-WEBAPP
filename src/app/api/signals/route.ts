import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const revalidate = 30; // Revalidate every 30 seconds (1/2 minute)

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM signals ORDER BY id DESC");
    client.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching signals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
