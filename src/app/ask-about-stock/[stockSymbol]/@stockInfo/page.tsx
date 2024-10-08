import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, BarChart3Icon } from "lucide-react";

export default async function StockInfoPage({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const stockData = {
    symbol: params.stockSymbol,
    price: 150.25,
    previousClose: 149.8,
    open: 150.0,
    dayLow: 149.5,
    dayHigh: 151.0,
    volume: 5000000,
    avgVolume10Days: 4800000,
    marketCap: "2.5T",
    change: 0.45,
    changePercent: 0.3,
  };
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await delay(6000);
  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-[#003E77] flex items-center">
            <TrendingUpIcon className="w-5 h-5 mr-2" /> Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Previous Close</p>
            <p className="font-semibold text-[#1877F2]">
              ${stockData.previousClose}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Open</p>
            <p className="font-semibold text-[#1877F2]">${stockData.open}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Day Low</p>
            <p className="font-semibold text-[#1877F2]">${stockData.dayLow}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Day High</p>
            <p className="font-semibold text-[#1877F2]">${stockData.dayHigh}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-[#003E77] flex items-center">
            <BarChart3Icon className="w-5 h-5 mr-2" /> Volume
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Volume</p>
            <p className="font-semibold text-[#1877F2]">
              {stockData.volume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg. Volume (10 days)</p>
            <p className="font-semibold text-[#1877F2]">
              {stockData.avgVolume10Days.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Market Cap</p>
            <p className="font-semibold text-[#1877F2]">
              ${stockData.marketCap}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
