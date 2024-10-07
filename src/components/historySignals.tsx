"use client";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import UseSWR from "swr";
import { SignalHistory } from "@/types/signal";

interface langProps {
  lang: string; // Define the expected prop type
}

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
export default function HistorySignals({ lang }: langProps) {
  const {
    data: signals,
    error,
    isLoading,
  } = UseSWR<SignalHistory[]>("/api/signalHistory", fetcher, {
    refreshInterval: 30000, // Optional: Polling every 30 seconds
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
          <TableCell className="font-medium text-[#1877F2] text-[10px] sm:text-sm md:text-base py-2 sm:py-4 px-3 sm:px-4">
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs md:text-sm bg-blue-50 text-blue-700 border-blue-200 px-1 sm:px-2 py-0.5 sm:py-1"
            >
              {item.symbol}
            </Badge>
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base py-2 sm:py-4 px-1 sm:px-4">
            {formatDate(item.entrance_date)}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base py-2 sm:py-4 px-1 sm:px-4">
            ${item.in_price}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base py-2 sm:py-4 px-1 sm:px-4">
            ${item.out_price}
          </TableCell>
          <TableCell className="text-gray-600 text-[10px] sm:text-sm md:text-base py-2 sm:py-4 px-1 sm:px-4">
            {formatDate(item.closing_date)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

/* const historyData = [
    {
      symbol: "AAPL",
      entranceDate: "2023-05-20",
      closingDate: "2023-05-20",
      entrancePrice: "150.25",
      closingPrice: "152.80",
    },
    {
      symbol: "GOOGL",
      entranceDate: "2023-05-20",
      closingDate: "2023-05-20",
      entrancePrice: "2750.80",
      closingPrice: "2748.75",
    },
    {
      symbol: "MSFT",
      entranceDate: "2023-05-20",
      closingDate: "2023-05-20",
      entrancePrice: "305.15",
      closingPrice: "307.30",
    },
    {
      symbol: "AMZN",
      entranceDate: "2023-05-20",
      closingDate: "2023-05-20",
      entrancePrice: "3300.50",
      closingPrice: "3315.25",
    },
  ]; */
