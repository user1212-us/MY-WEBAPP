import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import StockSubmit from "@/components/stockSubmitForm";

export const metadata: Metadata = {
  title: "Ask About Any US Stock | US Stock Hub",
  description:
    "Ask about any US stock and get comprehensive, real-time data on price, performance, news, and analysis.",
  keywords:
    "ask about stock, US stock data, stock query, stock market analysis, stock research",
};
export default function AskAboutStockPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto mb-24">
        <CardHeader>
          <CardTitle className="text-[#003E77] text-2xl">
            Ask About a Stock
          </CardTitle>
          <p className="text-red-600 text-sm mt-2">
            You have 3 searches per day. Choose wisely!
          </p>
        </CardHeader>
        <CardContent>
          <StockSubmit lang="en" />
        </CardContent>
      </Card>
    </div>
  );
}
