"use client";
import { useState, useEffect } from "react";

interface Stock {
  symbol: string;
  companyName: string;
  sector: string;
  volume: number;
}

export default function Trending() {
  const [trendingStocks, setTrendingStocks] = useState<Stock[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingStocks = async () => {
      try {
        const response = await fetch("/api/volume");
        if (!response.ok) {
          throw new Error("Failed to fetch stock info");
        }
        const data = await response.json();
        setTrendingStocks(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Error fetching trending stocks data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingStocks();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
          Loading....
        </h3>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!trendingStocks || trendingStocks.length === 0) {
    return (
      <div className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl">
        <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
          No Stocks Yet
        </h3>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      dir="ltr"
    >
      {trendingStocks.map((stock, index) => (
        <div
          key={index}
          className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
            {stock.symbol}
          </h3>
          <p className="text-gray-600 text-sm sm:text-md mb-1 sm:mb-3">
            {stock.companyName}
          </p>
          <p className="text-xs sm:text-sm font-bold mb-1 sm:mb-2 text-[#1877F2]">
            ${new Intl.NumberFormat("en-US").format(stock.volume)}
          </p>
          <p className="text-sm sm:text-lg font-semibold">{stock.sector}</p>
        </div>
      ))}
    </div>
  );
}
