import React from "react";
import UpgradeDownComp from "@/components/adminNews/updownComp";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function UpgradeDowngradePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Latest Stock Upgrades and Downgrades
      </h1>
      <Card className="shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-600">
            Market Analyst Ratings
          </CardTitle>
        </CardHeader>
        <UpgradeDownComp />
      </Card>
    </div>
  );
}
