import { Metadata } from "next";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import NewsSentComponent from "@/components/adminNews/newsSent";

export const metadata: Metadata = {
  title: "News Sentiment | Admin Dashboard",
  description: "View and analyze news sentiment for various stocks",
};

export default function NewsSentimentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1877F2] mb-6">
        News Sentiment Analysis
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-[#003E77]">
            Latest News Sentiment
          </CardTitle>
        </CardHeader>
        <NewsSentComponent />
      </Card>
    </div>
  );
}
