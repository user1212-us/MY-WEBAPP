import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export default async function AskAboutStockPage({
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
  await delay(2000);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl md:text-4xl font-bold text-[#003E77] mb-4 md:mb-0">
        {params.stockSymbol} Stock Details
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <span className="text-2xl md:text-3xl font-bold mr-2 text-[#1877F2] mb-2 md:mb-0">
          ${stockData.price.toFixed(2)}
        </span>
        <span
          className={`flex items-center text-lg ${
            stockData.change >= 0 ? "text-[#28A745]" : "text-[#DC3545]"
          }`}
        >
          {stockData.change >= 0 ? (
            <ArrowUpIcon className="w-5 h-5 mr-1" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 mr-1" />
          )}
          {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}
