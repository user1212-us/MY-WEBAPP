"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalystSearchComp() {
  const [searchAnalyst, setSearchAnalyst] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (searchAnalyst.trim()) {
      router.push(`/admin/management/analyst/${searchAnalyst}`); // Navigate to the dynamic route
    }
  };
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#003E77]">
          Analyst Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="Enter Analyst Name"
              value={searchAnalyst}
              onChange={(e) => setSearchAnalyst(e.target.value)}
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
  );
}
