"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StockSearchPage() {
  const [searchSymbol, setSearchSymbol] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (searchSymbol.trim()) {
      router.push(`/admin/stocks/${searchSymbol}`); // Navigate to the dynamic route
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
                <Button onClick={handleSubmit} className="w-full md:w-auto">
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </div>
            </div>
            {/*  */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
