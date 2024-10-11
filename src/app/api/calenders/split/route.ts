import { NextResponse } from "next/server";
import { Split } from "@/types/calender";
import { format } from "date-fns"; // Using date-fns for formatting

export const revalidate = 43200; // Revalidate every 12 hours (43200 seconds)

export async function GET() {
  try {
    // Get current date
    const currentDate = new Date();

    // Get one month in the future
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    // Format the dates to yyyy-mm-dd
    const from = format(currentDate, "yyyy-MM-dd");
    const to = format(oneMonthLater, "yyyy-MM-dd");
    const apiResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_split_calendar?from=${from}&to=${to}&apikey=${process.env.MY_API_KEY}`
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await apiResponse.json();

    const processedData: Split[] = data.map((item: Split) => ({
      date: item.date,
      symbol: item.symbol,
      numerator: item.numerator,
      denominator: item.denominator,
      type: item.numerator > item.denominator ? "Forward" : "Reverse",
      ratio: `${item.numerator}:${item.denominator}`,
    }));

    return NextResponse.json(processedData.reverse(), { status: 200 });
  } catch (error) {
    console.error("Error fetching split data:", error);
    return NextResponse.json(
      { error: "Failed to fetch split data" },
      { status: 500 }
    );
  }
}