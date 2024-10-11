import { NextResponse } from "next/server";
import { translateText } from "@/lib/translate";

interface NewsArticle {
  titleEn: string; // Original English title
  titleAr: string; // Translated Arabic title
  symbol: string;
  publishedDate: string;
  site: string;
}

interface NewsArticleEn {
  title: string; // Original English title
  symbol: string;
  publishedDate: string;
  site: string;
}

// Cache to store translated articles
let translatedArticlesCache: NewsArticle[] = [];

export const revalidate = 60; // Revalidate every 1 minute

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
  // Fetch new articles every minute
  const apiResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_news?limit=30&apikey=${process.env.MY_API_KEY}`
  );

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch news data");
  }

  const newsData = await apiResponse.json();

  // Filter out articles that are already in the cache
  const newArticles = newsData.filter(
    (article: NewsArticleEn) =>
      !translatedArticlesCache.some(
        (cachedArticle) => cachedArticle.titleEn === article.title
      )
  );

  // Translate only the new articles
  const newTranslatedArticles = await Promise.all(
    newArticles.map(async (article: NewsArticleEn) => {
      const translatedTitle = await translateText(article.title);
      return {
        titleEn: article.title,
        titleAr: translatedTitle,
        symbol: article.symbol,
        publishedDate: article.publishedDate,
        site: article.site,
      };
    })
  );

  // Update the cache with new translated articles
  translatedArticlesCache = [
    ...newTranslatedArticles,
    ...translatedArticlesCache,
  ].slice(0, 30);

  return translatedArticlesCache;
}
