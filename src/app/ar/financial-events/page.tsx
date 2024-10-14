import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SplitComp from "@/components/split";
import EarningComp from "@/components/earning";
import IpoComp from "@/components/ipo";

// Mock data (replace with actual API calls in a real application)
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "المفكرة المالية | US Stock Hub",
  description:
    "ابقَ على اطلاع بأحدث التقويمات المالية بما في ذلك الطروحات الأولية المقبلة، تواريخ الأرباح، وانقسامات الأسهم. احصل على تحديثات دقيقة حول أهم الأحداث المالية في سوق الأسهم الأمريكي.",
  keywords:
    "التقويم المالي، تقويم الطروحات الأولية، تواريخ الأرباح، انقسامات الأسهم، سوق الأسهم الأمريكي، الطروحات الأولية المقبلة، الأحداث المالية، تحليل الأسهم، أخبار السوق",
};
const FinancialEventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold text-[#003E77] mb-6">
        المفكرة المالية
      </h1>

      <Tabs defaultValue="stock-splits" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-[#D9E8FB] p-1 mb-6">
          <TabsTrigger
            value="stock-splits"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            تجزئة الأسهم
          </TabsTrigger>
          <TabsTrigger
            value="earnings"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            تواريخ الأرباح
          </TabsTrigger>
          <TabsTrigger
            value="ipos"
            className="rounded-lg py-2.5 text-sm font-medium leading-5 text-[#003E77] data-[state=active]:bg-white data-[state=active]:shadow"
          >
            الاكتتابات العامة
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stock-splits">
          <SplitComp lang="ar" />
        </TabsContent>
        <TabsContent value="earnings">
          <EarningComp lang="ar" />
        </TabsContent>
        <TabsContent value="ipos">
          <IpoComp lang="ar" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialEventsPage;
