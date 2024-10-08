"use client";
import useSWR from "swr";
import { formatDistanceToNow, addHours } from "date-fns";
import { useState } from "react";

interface News {
  id: string;
  title: string;
  text: string;
  symbol: string;
  publishedDate: string;
  site: string;
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
  } = useSWR<News[]>("/api/news?limit=30", fetcher, {
    refreshInterval: 600000, // Refresh every 10 minutes
  });

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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {newsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex-column items-start mb-3">
            <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full whitespace-nowrap">
              {item.symbol}
            </span>
            <h2 className="text-base sm:text-base font-semibold text-[#1877F2] flex-grow pr-4 mt-2">
              {item.title}
            </h2>
          </div>
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
              {formatDistanceToNow(addHours(new Date(item.publishedDate), 7), {
                addSuffix: true,
              })}
            </span>
            <span className="italic">Provider: {item.site}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
