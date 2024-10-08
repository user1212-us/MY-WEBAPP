import { CardContent } from "@/components/ui/card";
import { translateText } from "@/lib/translate";

interface Article {
  title: string;
  text: string;
  site: string;
  publishedDate: string;
}

export default async function LatestArticles({
  params,
}: {
  params: { stockSymbol: string };
}) {
  const symbol = params.stockSymbol.toUpperCase();

  let latestArticles: Article[] | null = null;
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/stock/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_SECRET_KEY || "fallback-secret-key",
      },
      body: JSON.stringify({ symbol }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return (
          <CardContent>
            <h3 className="text-lg font-semibold text-[#1877F2] my-4 text-center ">
              حتى الآن لا يوجد أخبار رسمية لهذا السهم
            </h3>
          </CardContent>
        );
      }
      throw new Error("Failed to fetch stock info");
    }

    const data = await response.json();
    // Check if data is an array, if not, try to extract articles from a nested property
    latestArticles = Array.isArray(data) ? data : data.articles || [];

    if (!Array.isArray(latestArticles)) {
      console.error("Unexpected data structure:", latestArticles);
      latestArticles = [];
    }
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching price target data.</div>;
  }

  if (!latestArticles || latestArticles.length === 0) {
    return (
      <CardContent>
        <h3 className="text-lg font-semibold text-[#1877F2] my-4 text-center">
          حتى الآن لا يوجد أخبار رسمية لهذا السهم
        </h3>
      </CardContent>
    );
  }

  const translatedArticles = await Promise.all(
    latestArticles.map(async (article) => ({
      ...article,
      translatedTitle: await translateText(article.title),
      translatedText: await translateText(article.text),
    }))
  );

  return (
    <CardContent>
      <div className="space-y-6 text-right" dir="rtl">
        {translatedArticles.map((article, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 p-4 rounded transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-[#1877F2] mb-2">
              {article.translatedTitle}
            </h3>
            <p className="text-gray-600 mb-2">{article.translatedText}</p>
            <div className="flex flex-row-reverse justify-between items-end text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                تاريخ النشر: {article.publishedDate}
              </span>
              <span className="italic">
                المصدر: {article.site.split(".")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
