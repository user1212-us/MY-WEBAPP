import React from "react";
import { Metadata } from "next";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Signal } from "lucide-react";
import CurrentSignals from "@/components/currentSignals";
export const metadata: Metadata = {
  title: "Signals | Real-Time Stock Market Alerts",
  description:
    "Get the latest real-time trading signals and stock market alerts. Powered by cutting-edge algorithms for accuracy and reliability.",
  keywords:
    "trading signals, stock market alerts, real-time signals, stock analysis, financial insights",
};
const SignalsPage = () => {
  return (
    <div className="mb-16 sm:mb-24">
      <Card className="w-full shadow-lg bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#003E77] to-[#0056a8] text-white p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            <Signal className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
            Signals
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Symbol
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Type
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Enter Price
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Price Now
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    First Target
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Second Target
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
                    Time Opened
                  </TableHead>
                </TableRow>
              </TableHeader>
              <CurrentSignals />
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignalsPage;
