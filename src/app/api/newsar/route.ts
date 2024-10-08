import { NextResponse } from "next/server";
import { translateText } from "@/lib/translate";

interface NewsArticle {
  title: string;
  symbol: string;
  publishedDate: string;
  site: string;
}

export const revalidate = 600; // Revalidate every 10 minutes

export async function GET() {
  try {
    const newsArticles = await fetchAndTranslateNews();
    return NextResponse.json(newsArticles, { status: 200 });
  } catch (error) {
    console.error("Error in GET Arabic news:", error);
    return NextResponse.json(
      { error: "Failed to fetch Arabic news" },
      { status: 500 }
    );
  }
}

async function fetchAndTranslateNews(): Promise<NewsArticle[]> {
  const apiResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_news?limit=30&apikey=${process.env.MY_API_KEY}`
  );

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch news data");
  }

  const newsData = await apiResponse.json();

  const translatedNews = await Promise.all(
    newsData.map(async (article: NewsArticle) => {
      const translatedTitle = await translateText(article.title);
      return {
        title: translatedTitle,
        symbol: article.symbol,
        publishedDate: article.publishedDate,
        site: article.site,
      };
    })
  );

  return translatedNews;
}
