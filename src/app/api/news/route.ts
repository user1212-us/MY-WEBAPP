import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Define a type for the news article
interface NewsArticle {
  title: string;
  text: string;
  symbol: string;
  publishedDate: string;
  site: string;
}
export const revalidate = 600; // Revalidate every 60 seconds (1 minute)

export async function GET() {
  try {
    // Fetch new articles from the API
    const newArticles = await fetchNewsFromAPI();

    // Store new articles in the database
    await storeNewsInDatabase(newArticles);

    // Retrieve the most recent 70 articles from the database
    const recentNews = await getRecentNewsFromDatabase();

    return NextResponse.json(recentNews, { status: 200 });
  } catch (error) {
    console.error("Error in GET news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

async function fetchNewsFromAPI(): Promise<NewsArticle[]> {
  const apiResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_news?limit=30&apikey=${process.env.MY_API_KEY}`
  );

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch news data");
  }

  return await apiResponse.json();
}

async function storeNewsInDatabase(news: NewsArticle[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const article of news) {
      const siteName = article.site.split(".")[0]; // Extract site name without domain
      await client.query(
        "INSERT INTO news ( title, cont, symbol, published_date, site) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (title) DO NOTHING",
        [
          article.title,
          article.text,
          article.symbol,
          new Date(article.publishedDate),
          siteName,
        ]
      );
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

async function getRecentNewsFromDatabase() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM news ORDER BY published_date DESC LIMIT 30"
    );
    return result.rows;
  } finally {
    client.release();
  }
}
