import React, { Suspense } from "react";
import { Metadata } from "next";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CurrentSignals from "@/components/currentSignals";
export const metadata: Metadata = {
  title: "توصيات سوق الأسهم | US Stock Hub",
  description:
    "احصل على أحدث توصيات السوق وإشعارات التداول للأسهم الأمريكية. حسّن استراتيجياتك التداولية مع توصيات الخبراء.",
  keywords:
    "توصيات الأسهم, إشعارات التداول, تداول الأسهم الأمريكية, توصيات التداول, إشارات سوق الأسهم",
};
const SignalsPage = () => {
  return (
    <div className="mb-16 sm:mb-24" dir="rtl">
      <Card className="w-full shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-l from-[#003E77] to-[#0056a8] text-white p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            التوصيات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200 ">
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    الرمز
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    النوع
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    سعر الدخول
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    السعر الآن
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    الهدف الأول
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    الهدف الثاني
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    تاريخ الدخول
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Suspense
                  fallback={
                    <TableRow className="bg-gray-50 border-b border-gray-200 ">
                      <TableCell
                        colSpan={7}
                        className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center"
                      >
                        تحميل التوصيات
                      </TableCell>
                    </TableRow>
                  }
                >
                  <CurrentSignals lang="ar" />
                </Suspense>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignalsPage;
