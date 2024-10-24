import { CardContent } from "@/components/ui/card";

const errTranslate: { [key: string]: string } = {
  HighTarget: "أقصى هدف",
  ConsensusTaregt: "هدف الأجماع",
  MedianTarget: "الهدف المتوسط",
  LowTarget: "أدنى هدف",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Recomendations({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const symbol = params.stockSymbol.toUpperCase();

  let priceTargets = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/stock/target`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_SECRET_KEY || "fallback-secret-key",
        },
        body: JSON.stringify({ symbol }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return (
          <CardContent>
            <div className="sm:w-auto mb-4 text-center">
              <p className="font-semibold text-lg text-[#1877F2]">
                حتى الآن لم يتم تغطية هذا السهم من قبل البنوك أو المؤسسات
                المالية{" "}
              </p>
            </div>
          </CardContent>
        );
      }
      throw new Error("Failed to fetch stock info");
    }

    priceTargets = await response.json();
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching price target data.</div>;
  }

  if (!priceTargets) {
    return <div>No data Found</div>;
  }

  const {
    targetHigh: HighTarget,
    targetLow: LowTarget,
    targetConsensus: ConsensusTaregt,
    targetMedian: MedianTarget,
  } = priceTargets;

  const recommendation = {
    HighTarget,
    ConsensusTaregt,
    MedianTarget,
    LowTarget,
  };

  return (
    <CardContent>
      <div className="flex flex-wrap justify-between">
        {Object.entries(recommendation).map(([key, value]) => (
          <div key={key} className="w-1/2 sm:w-auto mb-4 text-center">
            <p className="text-sm text-gray-600 capitalize">
              {errTranslate[key]}
            </p>
            <p
              className={`font-semibold text-lg ${
                key.includes("High")
                  ? "text-[#28A745]"
                  : key.includes("Low")
                  ? "text-[#DC3545]"
                  : "text-[#1877F2]"
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
