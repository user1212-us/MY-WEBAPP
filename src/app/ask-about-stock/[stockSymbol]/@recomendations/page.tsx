import { CardContent } from "@/components/ui/card";
export default async function Recomendations({
  params,
}: {
  params: { stockSymbol: string };
}) {
  console.log(params);

  /*  type Recomendation = {
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
  }; */
  /*   type TrendData = {
    period: string;
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
  };

  type ApiResponse = {
    recommendationTrend: {
      trend: TrendData[];
    };
    maxAge: number;
  };
  const symbol = params.stockSymbol; // Default to AMD if no symbol is provided

  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY || "", // Use environment variable for security
      "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST || "", // Replace with actual host
    },
  };

  const response = await fetch(
    `https://yh-finance-complete.p.rapidapi.com/recommendation?symbol=${symbol}`,
    options
  ); */

  /*   const data = await response.json();
  console.log(data);
  const recommendations = (data: ApiResponse): Recomendation => {
    // Destructuring the first element in the trend array (most recent recommendation period)
    const { strongBuy, buy, hold, sell, strongSell } =
      data.recommendationTrend.trend[0];

    return {
      strongBuy,
      buy,
      hold,
      sell,
      strongSell,
    }; */

  // const recommendation = recommendations(data);
  const recommendation = {
    strongBuy: 10,
    buy: 5,
    hold: 2,
    sell: 1,
    strongSell: 0,
  };
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
