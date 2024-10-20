import { NextRequest, NextResponse } from "next/server";
const API_SECRET_KEY = process.env.API_SECRET_KEY || "fallback-secret-key";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== API_SECRET_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Parameters (for example, you might use these as query params

    // Make the GET request to the external API

    const apiResponse = await fetch(
      `https://financialmodelingprep.com/api/v4/stock-news-sentiments-rss-feed?page=0&apikey=${process.env.MY_API_KEY}`,
      { cache: "no-store" }
    );

    // If the response is not okay, throw an error
    if (!apiResponse.ok) {
      throw new Error("Failed to fetch RSS news");
    }

    // Convert the response to JSON
    const data: [] = await apiResponse.json();
    if (Array.isArray(data) && data.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    // Send the data back to the client

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any errors
    return NextResponse.json({ err: error }, { status: 500 });
  }
}
