import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, BarChart3Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { stockSymbol: string };
}): Promise<Metadata> {
  return {
    title: `معلومات السهم: ${params.stockSymbol} | بيانات وتحليلات شاملة`,
    description: `تحليل مفصل وبيانات لـ ${params.stockSymbol}. ابقَ على اطلاع بأسعار الأسهم الفورية، والأخبار، والأداء التاريخي.`,
    keywords: `${params.stockSymbol}, تحليل الأسهم, بيانات سوق الأسهم, أسعار الأسهم الأمريكية, أخبار الأسهم`,
  };
}

export default async function AskAboutStockPage({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const symbol = params.stockSymbol.toUpperCase();
  let stockData = null;
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/stock/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_SECRET_KEY || "fallback-secret-key",
      },
      body: JSON.stringify({ symbol }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error("Failed to fetch stock info");
    }

    stockData = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }

  if (!stockData) {
    notFound();
  }

  return (
    <>
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-md"
        dir="rtl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#003E77] mb-4 md:mb-0">
          {stockData.name} تفاصيل سهم ({params.stockSymbol})
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <span className="text-2xl md:text-3xl font-bold mr-2 text-[#1877F2] mb-2 md:mb-0">
            ${stockData.price}
          </span>
          <span
            className={`flex items-center text-lg ${
              stockData.change >= 0 ? "text-[#28A745]" : "text-[#DC3545]"
            }`}
          >
            {stockData.change >= 0 ? (
              <ArrowUpIcon className="w-5 h-5 ml-1" />
            ) : (
              <ArrowDownIcon className="w-5 h-5 ml-1" />
            )}
            {stockData.change} ({stockData.changePercent}
            %)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" dir="rtl">
        <Card
          className="hover:shadow-lg transition-shadow duration-300"
          dir="rtl"
        >
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center">
              <TrendingUpIcon className="w-5 h-5 ml-2" /> الملخص
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">الإغلاق السابق</p>
              <p className="font-semibold text-[#1877F2]">
                ${stockData.previousClose}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">الافتتاح</p>
              <p className="font-semibold text-[#1877F2]">${stockData.open}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">أدنى سعر خلال اليوم</p>
              <p className="font-semibold text-[#1877F2]">
                ${stockData.dayLow}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">أعلى سعر خلال اليوم</p>
              <p className="font-semibold text-[#1877F2]">
                ${stockData.dayHigh}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow duration-300"
          dir="rtl"
        >
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center">
              <BarChart3Icon className="w-5 h-5 ml-2" /> الحجم
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">حجم التداول اليومي</p>
              <p className="font-semibold text-[#1877F2]">
                ${new Intl.NumberFormat("en-US").format(stockData.volume)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">متوسط التداول اليومي</p>
              <p className="font-semibold text-[#1877F2]">
                ${new Intl.NumberFormat("en-US").format(stockData.avgVolume)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                متوسط سعر السهم خلال 50 يوم
              </p>
              <p className="font-semibold text-[#1877F2]">
                ${new Intl.NumberFormat("en-US").format(stockData.priceAvg50)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">القيمة السوقية</p>
              <p className="font-semibold text-[#1877F2]">
                ${new Intl.NumberFormat("en-US").format(stockData.marketCap)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
