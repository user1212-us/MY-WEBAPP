import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Metadata } from "next";
import HistorySignals from "@/components/historySignals";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "سجل توصيات الأسهم | US Stock Hub",
  description:
    "راجع تاريخ توصيات الأسهم وأداء السوق في سوق الأسهم الأمريكية. حلل التداولات السابقة ونتائج السوق.",
  keywords:
    "تاريخ توصيات الأسهم, سجل التداول, أداء الأسهم الأمريكية, بيانات سوق الأسهم, تحليل الأسهم",
};

const HistoryPage = () => {
  return (
    <div className="mb-16 sm:mb-24" dir="rtl">
      <Card className="w-full shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#003E77] to-[#0056a8] text-white p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            <ArrowUpDown className="ml-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
            النتائج
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200 ">
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center">
                    الرمز
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    تاريخ الدخول
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    سعر الدخول
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    سعر الاغلاق
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    تاريخ الاغلاق
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
                        Loading signals...
                      </TableCell>
                    </TableRow>
                  }
                >
                  <HistorySignals lang="en" />
                </Suspense>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
