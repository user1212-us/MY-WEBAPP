import { NextResponse } from "next/server";
import { translateText } from "@/lib/translate";
import { NewsArticle, NewsArticleEn } from "@/types/news";

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
    `https://financialmodelingprep.com/api/v4/stock-news-sentiments-rss-feed?page=0&apikey=${process.env.MY_API_KEY}`
  );

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch news data");
  }

  const newsData: [] = await apiResponse.json();
  const newsDataSliced = newsData.slice(0, 40);
  // Filter out articles that are already in the cache
  const newArticles = newsDataSliced.filter(
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
        sentiment: article.sentiment,
        sentimentScore: article.sentimentScore,
      };
    })
  );

  // Sort new translated articles by publishedDate in descending order
  newTranslatedArticles.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  // Update the cache with new translated articles at the beginning
  translatedArticlesCache = [
    ...newTranslatedArticles,
    ...translatedArticlesCache.filter(
      (cachedArticle) =>
        !newTranslatedArticles.some(
          (newArticle) => newArticle.titleEn === cachedArticle.titleEn
        )
    ),
  ].slice(0, 40);

  return translatedArticlesCache;
}
