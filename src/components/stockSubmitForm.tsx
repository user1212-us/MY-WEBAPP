"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StockFormProps {
  lang: string; // Define the expected prop type
}

const StockForm = ({ lang }: StockFormProps) => {
  const router = useRouter();
  const [stockSymbol, setStockSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission
    if (stockSymbol.trim()) {
      router.push(
        `/${lang === "ar" ? "ar" : "en"}/ask-about-stock/${stockSymbol}`
      ); // Navigate to the dynamic route
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-sm font-medium text-[#003E77] mb-2"
          htmlFor="stockSymbol"
        >
          {lang === "ar" ? "رمز السهم" : "Stock Symbol"}
        </label>
        <Input
          id="stockSymbol"
          name="stockSymbol"
          type="text"
          placeholder={
            lang === "ar"
              ? "ادخل رمز السهم (بالانجليزية)"
              : "Enter stock symbol"
          }
          required
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)} // Capture input value
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#1877F2] text-white hover:bg-[#003E77]"
      >
        {lang === "ar" ? "احصل على معلومات السهم" : "Get Stock Details"}
      </Button>
    </form>
  );
};

export default StockForm;
