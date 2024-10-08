import React from "react";
//import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon, NewspaperIcon, Target } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { stockSymbol: string };
}): Promise<Metadata> {
  return {
    title: `Stock Information: ${params.stockSymbol} | Comprehensive Data & Analysis`,
    description: `Detailed analysis and data for ${params.stockSymbol}. Stay updated with real-time stock prices, news, and historical performance.`,
    keywords: `${params.stockSymbol}, stock analysis, stock market data, US stock prices, stock news`,
  };
}

export default function StockDetailsPageLayout({
  children,
  recomendations,
  latestArticles,
  priceTarget,
}: {
  children: React.ReactNode;
  recomendations: React.ReactNode;
  latestArticles: React.ReactNode;
  priceTarget: React.ReactNode;
}) {
  //const router = useRouter();
  //const { symbol } = router.query;

  // Mock data (replace with actual API call in a real application)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
        {children}
        <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center text-2xl">
              <Target className="w-6 h-6 mr-2" /> Price Target
            </CardTitle>
          </CardHeader>
          {priceTarget}
        </Card>
        <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center text-2xl">
              <DollarSignIcon className="w-6 h-6 mr-2" /> Recommendations
            </CardTitle>
          </CardHeader>
          {recomendations}
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center text-2xl">
              <NewspaperIcon className="w-6 h-6 mr-2" /> Latest News
            </CardTitle>
          </CardHeader>
          {latestArticles}
        </Card>
      </div>
    </>
  );
}
