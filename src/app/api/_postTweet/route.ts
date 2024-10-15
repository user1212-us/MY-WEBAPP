import OAuth from "oauth-1.0a";
import crypto from "crypto-js";
import { NextResponse } from "next/server";

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const endpointURL = "https://api.twitter.com/2/tweets";

interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
}

// OAuth 1.0a signature generation
const oauth = new OAuth({
  consumer: { key: consumerKey!, secret: consumerSecret! },
  signature_method: "HMAC-SHA1",
  hash_function(baseString: string, key: string) {
    return crypto.HmacSHA1(baseString, key).toString(crypto.enc.Base64);
  },
});

const token = {
  key: accessToken!,
  secret: accessTokenSecret!,
};

// Add this function to check environment variables
function checkEnvironmentVariables() {
  const variables = [
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET",
    "TWITTER_ACCESS_TOKEN",
    "TWITTER_ACCESS_TOKEN_SECRET",
  ];

  for (const variable of variables) {
    if (!process.env[variable]) {
      console.error(`Missing environment variable: ${variable}`);
    } else {
      console.log(`${variable} is set`);
    }
  }
}

// Function to post a tweet
async function postTweet(text: string) {
  const data = { text };
  const request = {
    url: endpointURL,
    method: "POST",
  };

  const authHeader = oauth.toHeader(oauth.authorize(request, token));

  console.log("Auth Header:", authHeader); // Log the auth header

  try {
    const response = await fetch(endpointURL, {
      method: "POST",
      headers: {
        Authorization: authHeader["Authorization"],
        "Content-Type": "application/json",
        "User-Agent": "v2CreateTweetJS",
      },
      body: JSON.stringify(data),
    });

    const tweetData = await response.json();

    if (response.ok) {
      console.log("Tweet posted successfully:", tweetData);
      return { success: true, data: tweetData };
    } else {
      console.error("Error posting tweet:", tweetData);
      console.error("Response status:", response.status);
      console.error("Response headers:", response.headers);
      return { success: false, error: tweetData };
    }
  } catch (error) {
    console.error("Request failed:", error);
    return { success: false, error };
  }
}

// POST route handler
export async function GET() {
  checkEnvironmentVariables(); // Add this line to check environment variables

  try {
    let news: NewsAr[] = [];
    news = await fetcher(process.env.NEXTAUTH_URL + "/api/newsar");
    news = news.slice(27, 30); // Corrected this line

    const results = [];

    for (const item of news) {
      const result = await postTweet("$" + item.symbol + "\n" + item.titleAr);
      results.push(result);

      if (!result.success) {
        console.error("Failed to post tweet:", result.error);
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Failed to fetch Arabic news or post tweets, " + error },
      { status: 500 }
    );
  }
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Arabic news");
  }
  return response.json();
};
