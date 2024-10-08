import { CardContent } from "@/components/ui/card";

export default async function LatestArticles() {
  const latestArticles = [
    {
      title: "Tech Giants Lead Market Rally",
      content:
        "Major tech companies reported strong earnings, boosting investor confidence.",
      provider: "Financial Times",
    },
    {
      title: "New Regulations Impact Stock Performance",
      content:
        "Recent policy changes have influenced trading patterns across various sectors.",
      provider: "Wall Street Journal",
    },
    {
      title: "Analysts Predict Bull Run for Tech Stocks",
      content:
        "Market experts foresee continued growth in the technology sector.",
      provider: "Bloomberg",
    },
  ];
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await delay(4000);
  return (
    <CardContent>
      <div className="space-y-6">
        {latestArticles.map((article, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-[#1877F2] mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-2">{article.content}</p>
            <p className="text-sm text-[#003E77] font-medium">
              Source: {article.provider}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
