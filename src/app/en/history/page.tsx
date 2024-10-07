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
  title: "History | US Stock Hub",
  description:
    "Discover the most accurate stock trading signals powered by advanced algorithms, along with the latest US stock market news and insights.",
  keywords:
    "stock signals, US stock market news, trading signals, stock market insights, financial analysis, stock data,stock market trends, stock performance, trading signals history, stock data analysis",
};
const HistoryPage = () => {
  return (
    <div className="mb-16 sm:mb-24">
      <Card className="w-full shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#003E77] to-[#0056a8] text-white p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            <ArrowUpDown className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200 ">
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-3 sm:px-4 py-2 sm:py-3 text-center">
                    Symbol
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Entrance
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    In Price
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Out Price
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Closing
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
