import React from "react";
//import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NewspaperIcon, Target } from "lucide-react";

export default function StockDetailsPageLayout({
  children,
  priceTargetNews,
  downUp,
}: {
  children: React.ReactNode;
  priceTargetNews: React.ReactNode;
  downUp: React.ReactNode;
}) {
  //const router = useRouter();
  //const { symbol } = router.query;

  // Mock data (replace with actual API call in a real application)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
        {children}

        <Card className="hover:shadow-lg transition-shadow duration-300 mb-8">
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center text-2xl">
              <NewspaperIcon className="w-6 h-6 mr-2" />
              Upgrade/Downgrade
            </CardTitle>
          </CardHeader>
          {downUp}
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 mb-8">
          <CardHeader>
            <CardTitle className="text-[#003E77] flex items-center text-2xl">
              <Target className="w-6 h-6 mr-2" /> Latest Price Target
            </CardTitle>
          </CardHeader>
          {priceTargetNews}
        </Card>
      </div>
    </>
  );
}
