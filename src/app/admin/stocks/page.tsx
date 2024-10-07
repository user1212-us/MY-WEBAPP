"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Menu } from "lucide-react";

const StocksManagement = () => {
  const [searchSymbol, setSearchSymbol] = useState("");
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);

  const fetchStockInfo = () => {
    // In a real application, you would fetch this data from an API
    setStockInfo({
      symbol: searchSymbol,
      name: "Example Company",
      price: 150.25,
      change: 2.5,
      changePercent: 1.69,
      marketCap: "2.5T",
      peRatio: 25.6,
      dividend: 0.82,
      volume: 5000000,
      avgVolume: 4800000,
      high: 152.0,
      low: 149.5,
      open: 150.0,
      previousClose: 147.75,
    });
  };

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/signals", label: "Signals" },
    { href: "/admin/stocks", label: "Stocks" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#003E77] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 lg:hidden" />
            <h1 className="text-2xl font-bold">StockPro Admin</h1>
          </div>
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#1877F2] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-[#003E77]">
              Stocks Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Input
                  placeholder="Enter stock symbol"
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={fetchStockInfo} className="w-full md:w-auto">
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </div>
            </div>
            {stockInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {stockInfo.symbol} - {stockInfo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <StockInfoItem
                      label="Price"
                      value={`$${stockInfo.price}`}
                    />
                    <StockInfoItem
                      label="Change"
                      value={`${stockInfo.change > 0 ? "+" : ""}${
                        stockInfo.change
                      } (${stockInfo.changePercent}%)`}
                      className={
                        stockInfo.change >= 0
                          ? "text-[#28A745]"
                          : "text-[#DC3545]"
                      }
                    />
                    <StockInfoItem
                      label="Market Cap"
                      value={stockInfo.marketCap}
                    />
                    <StockInfoItem
                      label="P/E Ratio"
                      value={stockInfo.peRatio.toString()}
                    />
                    <StockInfoItem
                      label="Dividend Yield"
                      value={`${stockInfo.dividend}%`}
                    />
                    <StockInfoItem
                      label="Volume"
                      value={stockInfo.volume.toLocaleString()}
                    />
                    <StockInfoItem
                      label="Avg Volume"
                      value={stockInfo.avgVolume.toLocaleString()}
                    />
                    <StockInfoItem
                      label="52 Week High"
                      value={`$${stockInfo.high}`}
                    />
                    <StockInfoItem
                      label="52 Week Low"
                      value={`$${stockInfo.low}`}
                    />
                    <StockInfoItem label="Open" value={`$${stockInfo.open}`} />
                    <StockInfoItem
                      label="Previous Close"
                      value={`$${stockInfo.previousClose}`}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

interface StockInfoItemProps {
  label: string;
  value: string;
  className?: string;
}

const StockInfoItem: React.FC<StockInfoItemProps> = ({
  label,
  value,
  className,
}) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-lg font-semibold ${className}`}>{value}</p>
  </div>
);

interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  dividend: number;
  volume: number;
  avgVolume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export default StocksManagement;
