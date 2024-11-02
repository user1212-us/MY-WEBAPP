"use client";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface News {
  id: string;
  title: string;
  text: string;
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

export default function NewsComp() {
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  const {
    data: newsData,
    error,
    isLoading,
    mutate,
  } = useSWR<News[]>("/api/news?limit=30", fetcher, {
    refreshInterval: 60000, // Refresh every 1 minute
  });

  useEffect(() => {
    // Trigger an immediate re-fetch when the component mounts
    mutate();

    // Set up the interval for subsequent re-fetches
    const interval = setInterval(() => {
      mutate();
    }, 60000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        {" "}
        <h2 className="text-xl font-semibold text-[#1877F2] flex-grow pr-4">
          Loading News......
        </h2>
      </div>
    );
  if (error) return <div>Failed To Load News</div>;
  if (!newsData || newsData.length === 0) return <div>No News Available</div>;

  // for the
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
      {newsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full whitespace-nowrap">
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

          <h2 className="text-base sm:text-base font-semibold text-[#1877F2] flex-grow pr-4 mt-2 mb-1">
            {item.title}
          </h2>
          <div className="relative">
            <div
              className={`text-gray-700 mb-4 text-sm leading-relaxed ${
                expandedNews === item.id
                  ? "max-h-48 overflow-y-auto pr-2"
                  : "max-h-24 overflow-hidden"
              }`}
            >
              <p className="break-words">{item.text}</p>
            </div>
            {item.text.length > 200 && (
              <button
                className="text-[#1877F2] font-semibold mt-2"
                onClick={() =>
                  setExpandedNews(expandedNews === item.id ? null : item.id)
                }
              >
                {expandedNews === item.id ? "Read Less" : "Read More"}
              </button>
            )}
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
{
  /* <span className="bg-gray-100 px-2 py-1 rounded">
{formatDistanceToNow(addHours(new Date(item.publishedDate), 7), {
  addSuffix: true,
})}
</span> */
}
