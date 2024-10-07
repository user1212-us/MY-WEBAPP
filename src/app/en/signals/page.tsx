import React from "react";
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
import { Signal } from "lucide-react";
import CurrentSignals from "@/components/currentSignals";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Signals | US Stock Hub",
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
                <TableRow className="bg-gray-50 border-b border-gray-200 ">
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Symbol
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Type
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Enter Price
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Price Now
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    First Target
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Second Target
                  </TableHead>
                  <TableHead className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center">
                    Time Opened
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
                  <CurrentSignals lang="en" />
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
