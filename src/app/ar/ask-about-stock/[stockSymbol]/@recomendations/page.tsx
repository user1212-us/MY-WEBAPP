import { CardContent } from "@/components/ui/card";

const errTranslate: { [key: string]: string } = {
  strongBuy: " شراء قوي",
  Buy: "شراء",
  Hold: "احتفاظ",
  Sell: "بيع",
  strongSell: "بيع قوي",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Recomendations({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const symbol = params.stockSymbol.toUpperCase();

  let recomendations = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/stock/recomendation`,
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
                حتى الآن لا يوجد مقالات رسمية لهذا السهم
              </p>
            </div>
          </CardContent>
        );
      }
      throw new Error("Failed to fetch stock info");
    }
    recomendations = await response.json();
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching price target data.</div>;
  }
  const {
    analystRatingsStrongBuy: strongBuy,
    analystRatingsbuy: Buy,
    analystRatingsHold: Hold,
    analystRatingsSell: Sell,
    analystRatingsStrongSell: strongSell,
  } = recomendations;

  const recommendation = {
    strongBuy,
    Buy,
    Hold,
    Sell,
    strongSell,
  };

  return (
    <CardContent dir="rtl">
      <div className="flex flex-wrap justify-between">
        {Object.entries(recommendation).map(([key, value]) => (
          <div key={key} className="w-1/2 sm:w-auto mb-4 text-center">
            <p className="text-sm text-gray-600 capitalize">
              {errTranslate[key]}
            </p>
            <p
              className={`font-semibold text-lg ${
                key.includes("Buy")
                  ? "text-[#28A745]"
                  : key.includes("Sell")
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
