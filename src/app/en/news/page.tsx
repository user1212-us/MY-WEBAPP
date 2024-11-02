import React from "react";
import { Suspense } from "react";
import NewsComp from "@/components/newsComp";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "News | US Stock Hub",
  description:
    "Get the latest news and updates on the US stock market. Stay informed with breaking news and in-depth analysis.",
  keywords:
    "stock market news, US stock updates, stock analysis, financial news, market trends",
};
const NewsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#003E77] border-b-2 border-[#1877F2] pb-4">
        Latest Stock Market News
      </h1>
      <p className="text-sm text-gray-600 mb-8">News updated every minute.</p>
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
        <NewsComp />
      </Suspense>
    </div>
  );
};

export default NewsPage;
