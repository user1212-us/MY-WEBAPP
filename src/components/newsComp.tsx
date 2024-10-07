"use client";
import useSWR from "swr";
import { DateTime } from "luxon";
import { formatDistanceToNow } from "date-fns";

interface News {
  id: string;
  title: string;
  cont: string;
  symbol: string;
  published_date: string;
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
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-semibold text-[#1877F2] flex-grow pr-4">
              {item.title}
            </h2>
            <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full whitespace-nowrap">
              {item.symbol}
            </span>
          </div>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            {item.cont}
          </p>
          <div className="flex justify-between items-end text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {formatDistanceToNow(
                DateTime.fromISO(item.published_date, { zone: "utc" })
                  .plus({ hours: 7 })
                  .setZone("America/New_York")
                  .toJSDate(),
                { addSuffix: true }
              )}
            </span>
            <span className="italic">Provider: {item.site}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
