interface Stock {
  symbol: string;
  companyName: string;
  sector: string;
  volume: number;
}

export default async function Trending() {
  let trendingStocks: Stock[] | null = null;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/volume`, {
      next: { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds)
    });

    if (!response.ok) {
      if (response.status === 404) {
        return (
          <div className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
              No Stocks Yet
            </h3>
          </div>
        );
      }
      throw new Error("Failed to fetch stock info");
    }

    trendingStocks = await response.json();

    if (!trendingStocks || trendingStocks.length === 0) {
      return (
        <div className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
            No Stocks Yet
          </h3>
        </div>
      );
    }

    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        dir="ltr"
      >
        {trendingStocks.map((stock, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <h3 className="text-lg sm:text-2xl font-semibold text-[#1877F2] mb-1 sm:mb-2">
              {stock.symbol}
            </h3>
            <p className="text-gray-600 text-sm sm:text-md mb-1 sm:mb-3">
              {stock.companyName}
            </p>
            <p className="text-xs sm:text-sm font-bold mb-1 sm:mb-2 text-[#1877F2]">
              ${new Intl.NumberFormat("en-US").format(stock.volume)}
            </p>
            <p className="text-sm sm:text-lg font-semibold">{stock.sector}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching trending stocks data.</div>;
  }
}
