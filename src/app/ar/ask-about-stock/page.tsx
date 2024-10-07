import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import StockSubmit from "@/components/stockSubmitForm";

export const metadata: Metadata = {
  title: "اسأل عن أي سهم أمريكي | US Stock Hub",
  description:
    "اسأل عن أي سهم أمريكي واحصل على بيانات فورية حول السعر والأداء والأخبار والتحليل.",
  keywords:
    "اسأل عن سهم, بيانات الأسهم الأمريكية, استعلام عن الأسهم, تحليل سوق الأسهم, بحث عن الأسهم",
};
export default function AskAboutStockPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      <Card className="max-w-md mx-auto mb-24">
        <CardHeader>
          <CardTitle className="text-[#003E77] text-2xl">اسأل عن سهم</CardTitle>
          <p className="text-red-600 text-sm mt-2">
            لديك 3 عمليات بحث يوميًا. اختر بحكمة!
          </p>
        </CardHeader>
        <CardContent>
          <StockSubmit lang="ar" />
        </CardContent>
      </Card>
    </div>
  );
}
