import React from "react";
import { Suspense } from "react";
import { Metadata } from "next";
import NewsCompArabic from "@/components/newsCompAr";

export const metadata: Metadata = {
  title: "أخبار سوق الأسهم الأمريكية | US Stock Hub",
  description:
    "احصل على آخر الأخبار والتحديثات حول سوق الأسهم الأمريكية. تابع أحدث الأخبار والتحليلات المتعمقة.",
  keywords:
    "أخبار سوق الأسهم, تحديثات الأسهم الأمريكية, تحليل الأسهم, أخبار المالية, اتجاهات السوق",
};

const NewsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#003E77] border-b-2 border-[#1877F2] pb-4">
        أحدث أخبار سوق الأسهم
      </h1>
      <p className="text-sm text-gray-600 mb-8" dir="rtl">
        يتم تحديث الأخبار كل دقيقة
      </p>
      <Suspense
        fallback={
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            {" "}
            <h2 className="text-xl font-semibold text-[#1877F2] flex-grow pr-4">
              Loading News......
            </h2>
          </div>
        }
      >
        <NewsCompArabic />
      </Suspense>
    </div>
  );
};

export default NewsPage;
