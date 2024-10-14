import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SplitComp from "@/components/split";
import EarningComp from "@/components/earning";
import IpoComp from "@/components/ipo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Financial Calendar | US Stock Hub",
  description:
    "Stay informed with the latest financial calendar, including upcoming IPOs, earnings dates, and stock splits. Get accurate updates on key financial events in the US stock market.",
  keywords:
    "financial calendar, IPO calendar, earnings dates, stock splits, US stock market, upcoming IPOs, financial events, stock analysis, market news",
};
// Mock data (replace with actual API calls in a real application)

const FinancialEventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#003E77] mb-6">
        Financial calendar
      </h1>

      <Tabs defaultValue="stock-splits" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-[#D9E8FB] p-1 mb-6">
          <TabsTrigger
            value="stock-splits"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            Stock Splits
          </TabsTrigger>
          <TabsTrigger
            value="earnings"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            Earnings Dates
          </TabsTrigger>
          <TabsTrigger
            value="ipos"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            IPOs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stock-splits">
          <SplitComp />
        </TabsContent>
        <TabsContent value="earnings">
          <EarningComp />
        </TabsContent>
        <TabsContent value="ipos">
          <IpoComp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialEventsPage;
