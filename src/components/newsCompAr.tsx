"use client";
import useSWR from "swr";
import { formatDistanceToNow, addHours } from "date-fns";
import { ar } from "date-fns/locale";

interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
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
  } = useSWR<NewsAr[]>("/api/newsar", fetcher, {
    refreshInterval: 60000, // Refresh every 1 minutes
  });

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

  return (
    <div className="grid gap-6 md:grid-cols-2" dir="rtl">
      {newsData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex-column items-start mb-3">
            <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full whitespace-nowrap">
              {item.symbol}
            </span>
            <h2 className="text-x font-semibold text-[#1877F2] flex-grow pl-4 mt-2">
              {item.titleAr}
            </h2>
          </div>
          <div className="flex justify-between items-end text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {formatDistanceToNow(addHours(new Date(item.publishedDate), 7), {
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
