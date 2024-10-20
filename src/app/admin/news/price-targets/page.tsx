import { Metadata } from "next";
import PriceTargetNewsComp from "@/components/adminNews/priceTargetComp";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latest Price Target News",
  description: "View the most recent price target updates for stocks",
};

export default function PriceTargetPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-5xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#1877F2]">
            Latest Price Target News
          </CardTitle>
        </CardHeader>
        <PriceTargetNewsComp />
      </Card>
    </div>
  );
}
