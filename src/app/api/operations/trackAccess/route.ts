import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  const { userid } = await request.json();
  const userId = userid;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    const client = await pool.connect();

    // Check if user has already accessed this page today
    const checkQuery = `
      SELECT access_count FROM pageaccess 
      WHERE user_id = $1 AND access_date = $2
    `;
    const result = await client.query(checkQuery, [userId, today]);

    if (result.rows.length > 0) {
      const accessCount = result.rows[0].access_count;

      if (accessCount >= 3) {
        client.release();
        return NextResponse.json(
          { message: "Access limit reached for today" },
          { status: 403 }
        );
      }

      // Increment access count
      const updateQuery = `
        UPDATE pageaccess SET access_count = access_count + 1
        WHERE user_id = $1 AND access_date = $2
      `;
      await client.query(updateQuery, [userId, today]);
    } else {
      // First access today, insert record
      const insertQuery = `
        INSERT INTO pageaccess (user_id, access_date, access_count)
        VALUES ($1, $2, 1)
      `;
      await client.query(insertQuery, [userId, today]);
    }

    client.release();
    return NextResponse.json(
      { message: "Access tracked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
