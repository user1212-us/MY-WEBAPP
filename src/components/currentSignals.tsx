"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { RawSignal } from "@/types/signal";
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch signals");
  }
  return response.json();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad it to 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based index) and pad to 2 digits
  const year = date.getFullYear(); // Get the year

  return `${day}-${month}-${year}`;
};

interface langProps {
  lang: string; // Define the expected prop type
}

export default function CurrentSignals({ lang }: langProps) {
  const {
    data: signals,
    error,
    isLoading,
  } = useSWR<RawSignal[]>("/api/signals", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds (half minute)
  });

  if (isLoading)
    return (
      <TableRow className="bg-gray-50 border-b border-gray-200 ">
        <TableCell
          colSpan={7}
          className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center"
        >
          Loading signals...
        </TableCell>
      </TableRow>
    );
  if (error)
    return (
      <TableRow className="bg-gray-50 border-b border-gray-200 ">
        <TableCell
          colSpan={7}
          className="text-[red] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center"
        >
          Failed to load signals.
        </TableCell>
      </TableRow>
    );
  if (!signals || signals.length === 0)
    return (
      <TableRow className="bg-gray-50 border-b border-gray-200 ">
        <TableCell
          colSpan={7}
          className="text-[#1877F2] font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 text-center"
        >
          {lang === "ar" ? "لا يوجد توصيات الآن" : "There Are No Signals Now."}
        </TableCell>
      </TableRow>
    );

  return (
    <>
      {signals.map((item, index) => (
        <TableRow
          key={index}
          className="hover:bg-gray-50 transition-colors duration-200 text-center"
        >
          <TableCell className="font-medium text-[#1877F2] text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs md:text-sm bg-blue-50 text-blue-700 border-blue-200 px-1 sm:px-2 py-0.5 sm:py-1"
            >
              {item.symbol}
            </Badge>
          </TableCell>
          <TableCell
            className={`font-semibold text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3 ${
              item.type === "Buy"
                ? "text-green-600"
                : item.type === "Sell"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {lang === "ar" ? "شراء" : item.type}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            {item.enter_price}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            {item.price_now}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            {item.first_target}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            {item.second_target}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base px-1 sm:px-4 py-2 sm:py-3">
            {formatDate(item.date_opened)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

/* const signalsData = [
  {
    symbol: "AAPL",
    type: "Buy",
    enterPrice: "2.15$",
    priceNow: "2.5$",
    firstTarget: "2.7$",
    secondTarget: "2.8$",
    timeOpened: "20-9-2024",
  },
  {
    symbol: "GOOGL",
    type: "Sell",
    enterPrice: "2.80$",
    priceNow: "2.75$",
    firstTarget: "2.65$",
    secondTarget: "2.55$",
    timeOpened: "20-9-2024",
  },
  {
    symbol: "MSFT",
    type: "Buy",
    enterPrice: "3.20$",
    priceNow: "3.25$",
    firstTarget: "3.35$",
    secondTarget: "3.45$",
    timeOpened: "20-9-2024",
  },
  {
    symbol: "AMZN",
    type: "Hold",
    enterPrice: "3.50$",
    priceNow: "3.52$",
    firstTarget: "3.60$",
    secondTarget: "3.70$",
    timeOpened: "20-9-2024",
  },
]; */
