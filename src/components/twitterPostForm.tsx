"use client";
import { useState } from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTweetTemplate } from "@/lib/tweetTemplate";

interface NewsItem {
  symbol: string;
  titleAr: string;
  textAr: string;
  sentiment: string;
}

export default function TwitterPostForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [tweetCount, setTweetCount] = useState<number>(5);

  const twitterPost = async function () {
    setStatus("loading");
    setNewsArticles([]);

    try {
      const res = await fetch("/api/admin/postTweet-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: tweetCount }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        if (data.newsArticles) {
          setNewsArticles(data.newsArticles);
        }
      }
    } catch (error) {
      setStatus("error");
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="tweetCount" className="text-sm font-medium">
              Number of tweets:
            </label>
            <input
              id="tweetCount"
              type="number"
              min="1"
              max="50"
              value={tweetCount}
              onChange={(e) =>
                setTweetCount(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 px-2 py-1 border rounded-md"
            />
          </div>
        </div>

        <Button
          size="lg"
          className="w-64 h-12 text-lg"
          onClick={twitterPost}
          disabled={status === "loading"}
        >
          <Twitter className="w-5 h-5 mr-2" />
          {status === "loading" ? "Posting..." : "Post News to Twitter"}
        </Button>

        {status === "success" && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            All tweets posted successfully!
          </div>
        )}
      </div>

      {status === "error" && newsArticles.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Failed to post these news items. You can copy and post them
            manually:
          </h2>
          <div className="space-y-4">
            {newsArticles.map((news, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <pre className="whitespace-pre-wrap mb-2 font-arabic text-sm">
                  {createTweetTemplate(
                    news.symbol,
                    news.titleAr,
                    news.textAr,
                    news.sentiment
                  )}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      createTweetTemplate(
                        news.symbol,
                        news.titleAr,
                        news.textAr,
                        news.sentiment
                      )
                    )
                  }
                >
                  Copy Text
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
/* "use client";
import { useState } from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TwitterPostForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const twitterPost = async function () {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/postTweet-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        console.error("Failed to post tweet.");
      }
    } catch (error) {
      setStatus("error");
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="m-0 p-0">
      <Button
        className="w-full md:w-auto"
        onClick={twitterPost}
        disabled={status === "loading"}
      >
        <Twitter className="w-4 h-4 mr-2" />
        {status === "loading" ? "Posting..." : "Post News"}
      </Button>
      {status === "success" && (
        <p className="text-green-500 mt-2">Tweet posted successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
} */
