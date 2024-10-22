"use client";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Arabic news");
  }
  return response.json();
};

export default function NewsCompArabic() {
  const {
    data: newsData,
    error,
    isLoading,
    mutate,
  } = useSWR<NewsAr[]>("/api/newsar", fetcher, {
    refreshInterval: 60000, // Refresh every 1 minute
  });

  useEffect(() => {
    // Trigger an immediate re-fetch when the component mounts
    mutate();

    const interval = setInterval(() => {
      mutate();
    }, 60000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-[#1877F2] flex-grow pr-4">
          جاري تحميل الأخبار...
        </h2>
      </div>
    );
  }
  if (error) {
    return <div>فشل في تحميل الأخبار</div>;
  }
  if (!newsData || newsData.length === 0) {
    return <div>لا توجد أخبار متاحة</div>;
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
    <div className="grid gap-6 md:grid-cols-2" dir="rtl">
      {newsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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
          <h2 className="text-x font-semibold text-[#1877F2] flex-grow pl-4 mt-2">
            {item.titleAr}
          </h2>
          <div className="flex justify-between items-end text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {formatDistanceToNow(new Date(item.publishedDate), {
                addSuffix: true,
                locale: ar,
              })}
            </span>
            <span className="italic">المصدر: {item.site.split(".")[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
