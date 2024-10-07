import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Not Found | 404",
};
export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Search className="w-16 h-16 text-[#1877F2] mb-4" />
        <h1 className="text-4xl font-bold text-[#003E77] mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The stock you&apos;re looking for doesn&apos;t exist in the US
          Market.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          It might have been deleted, or you may have mistyped the stock symbol.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ask-about-stock">Search Stocks</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
