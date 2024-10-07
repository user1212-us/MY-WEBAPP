import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
};
export default function NotFoundPage() {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        dir="rtl"
      >
        <Search className="w-16 h-16 text-[#1877F2] mb-4" />
        <h1 className="text-4xl font-bold text-[#003E77] mb-2">
          404 - الصفحة غير موجودة
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          عذرًا! السهم الذي تبحث عنه غير موجود في السوق الأمريكي.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          ربما تم حذفه، أو قد تكون أخطأت في كتابة رمز السهم.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/ar/">العودة إلى الصفحة الرئيسية</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ar/ask-about-stock"> البحث عن الأسهم</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
