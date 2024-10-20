import { CardContent } from "@/components/ui/card";
import { newsRSS } from "@/types/adminSchemas";
import { formatDistanceToNow } from "date-fns";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

export default async function NewsSentComponent() {
  noStore(); // This prevents the result from being cached

  let latestNews: newsRSS[] | null = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/management/news/newsRSS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_SECRET_KEY || "fallback-secret-key",
        },
        cache: "no-store", // This ensures fresh data on each request
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return (
          <CardContent>
            {" "}
            <h3 className="text-lg font-semibold text-[#1877F2] my-4 text-center ">
              No Sentment News found
            </h3>
          </CardContent>
        );
      }
      throw new Error("Failed to fetch price target articles info");
    }

    const data = await response.json();
    // Check if data is an array, if not, try to extract articles from a nested property
    latestNews = Array.isArray(data) ? data : data.articles || [];

    if (!Array.isArray(latestNews)) {
      console.error("Unexpected data structure:", latestNews);
      latestNews = [];
    }
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching latest sentement news.</div>;
  }

  if (!latestNews || latestNews.length === 0) {
    return (
      <CardContent>
        {" "}
        <h3 className="text-lg font-semibold text-[#1877F2] my-4 text-center">
          No Sentment News found
        </h3>
      </CardContent>
    );
  }
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <TrendingUp className="w-4 h-4" />;
      case "negative":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {latestNews.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full">
              {item.symbol}
            </span>
            <div
              className={`flex items-center ${getSentimentColor(
                item.sentiment
              )}`}
            >
              {getSentimentIcon(item.sentiment)}
              <span className="ml-1 text-sm font-medium">
                {item.sentimentScore.toFixed(2)}
              </span>
            </div>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[#1877F2] mb-3">
            {item.title}
          </h2>
          <div className="text-gray-700 mb-4 text-sm leading-relaxed">
            <p className="break-words">{item.text}</p>
          </div>
          <div className="flex justify-between items-end text-xs text-gray-500 mt-4">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {formatDistanceToNow(new Date(item.publishedDate), {
                addSuffix: true,
              })}
            </span>
            <span className="italic">Provider: {item.site.split(".")[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
