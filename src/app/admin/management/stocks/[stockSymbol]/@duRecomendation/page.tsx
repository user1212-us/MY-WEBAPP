import { CardContent } from "@/components/ui/card";
import { upgradeDownGradeRecomendationSymbol } from "@/types/adminSchemas";
export default async function DownUpRecomendations({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const symbol = params.stockSymbol.toUpperCase();

  let recomendations = null;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/management/stock/downupRecomendation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_SECRET_KEY || "fallback-secret-key",
        },
        body: JSON.stringify({ symbol }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch stock info: ${errorData.error || response.statusText}`
      );
    }
    recomendations = await response.json();
  } catch (error) {
    console.error("Error:", error);
    return (
      <div>
        Error fetching price target data:{" "}
        {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  const recommendation: upgradeDownGradeRecomendationSymbol = recomendations;

  return (
    <CardContent>
      <div className="flex flex-wrap justify-between">
        {Object.entries(recommendation).map(([key, value]) => (
          <div key={key} className="w-1/2 sm:w-auto mb-4 text-center">
            <p className="text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
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
