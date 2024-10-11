import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every 1 hours (86400 seconds)

export async function GET() {
  try {
    // Parameters (for example, you might use these as query params

    // Make the GET request to the external API
    const apiResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock-screener?volumeMoreThan=10000000&limit=4&apikey=${process.env.MY_API_KEY}`
    );

    // If the response is not okay, throw an error
    if (!apiResponse.ok) {
      throw new Error("Failed to fetch stock data");
    }

    // Convert the response to JSON
    const data = await apiResponse.json();
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
