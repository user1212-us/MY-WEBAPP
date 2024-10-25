import OAuth from "oauth-1.0a";
import crypto from "crypto-js";
import { NextResponse } from "next/server";
import { NewsArticleTwitter, NewsArticleEnTwitter } from "@/types/news";
import { translateText } from "@/lib/translate";
import { createTweetTemplate } from "@/lib/tweetTemplate";
import { getServerSession } from "next-auth";

// Twitter API credentials
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const endpointURL = "https://api.twitter.com/2/tweets";

// OAuth 1.0a signature generation
const oauth = new OAuth({
  consumer: { key: consumerKey!, secret: consumerSecret! },
  signature_method: "HMAC-SHA1",
  hash_function(baseString: string, key: string) {
    return crypto.HmacSHA1(baseString, key).toString(crypto.enc.Base64);
  },
});

const token = {
  key: accessToken!, // User-specific access token
  secret: accessTokenSecret!, // User-specific access token secret
};

// Function to post a tweet using OAuth 1.0a
async function postTweet(text: string) {
  const data = { text };
  const request = {
    url: endpointURL,
    method: "POST",
  };

  const authHeader = oauth.toHeader(oauth.authorize(request, token));

  try {
    const response = await fetch(endpointURL, {
      method: "POST",
      headers: {
        Authorization: authHeader["Authorization"], // OAuth 1.0a header
        "Content-Type": "application/json",
        "User-Agent": "v2CreateTweetJS",
      },
      body: JSON.stringify(data),
    });

    const tweetData = await response.json();

    if (response.ok) {
      return { success: true, data: tweetData };
    } else {
      return { success: false, error: tweetData };
    }
  } catch (error) {
    return { success: false, error };
  }
}

// POST route handler
export async function POST() {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (session) {
    if (session.user) {
      if (session.user.email) {
        if (session.user.email !== "rashed111222@yahoo.com")
          return new NextResponse("Unauthorized", { status: 401 });
      } else {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }
  }

  try {
    const newsArticles = await fetchAndTranslateNews();

    const results = [];

    for (const item of newsArticles) {
      const result = await postTweet(
        createTweetTemplate(
          item.symbol,
          item.titleAr,
          item.textAr,
          item.sentiment
        )
      );
      results.push(result);

      if (!result.success) {
        //console.error("Failed to post tweet:", result.error);
        console.error("Failed to post tweet");
        throw new Error("Failed to Post tweets (Maybe bundle finished)");
      }
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Failed to fetch Arabic news or post tweets, " + error },
      { status: 500 }
    );
  }
}

async function fetchAndTranslateNews(): Promise<NewsArticleTwitter[]> {
  // Fetch new articles every minute
  const apiResponse = await fetch(
    `https://financialmodelingprep.com/api/v4/stock-news-sentiments-rss-feed?page=0&apikey=${process.env.MY_API_KEY}`
  );

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch news data");
  }

  const newsData: [] = await apiResponse.json();
  const newsDataSliced = newsData.slice(0, 5);
  // Filter out articles that are already in the cache

  // Translate only the new articles
  const translatedArticles = await Promise.all(
    newsDataSliced.map(async (article: NewsArticleEnTwitter) => {
      const translatedTitle = await translateText(article.title);
      const translatedText = await translateText(article.text);
      return {
        titleEn: article.title,
        titleAr: translatedTitle,
        symbol: article.symbol,
        publishedDate: article.publishedDate,
        site: article.site,
        sentiment: article.sentiment,
        sentimentScore: article.sentimentScore,
        textAr: translatedText,
      };
    })
  );

  return translatedArticles;
}
