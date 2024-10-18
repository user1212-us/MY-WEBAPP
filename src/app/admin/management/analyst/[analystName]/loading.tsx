import React from "react";
import { Loader2 } from "lucide-react";
export default function LoadingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Loader2 className="w-16 h-16 text-[#1877F2] animate-spin mb-4" />
        <h1 className="text-3xl font-bold text-[#003E77] mb-2">Loading...</h1>
        <p className="text-xl text-gray-600">
          Please wait while we fetch the latest analyst data for you.
        </p>
      </div>
    </>
  );
}
