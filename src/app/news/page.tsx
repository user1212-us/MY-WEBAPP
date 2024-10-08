import React from "react";

const NewsPage = () => {
  const newsData = [
    {
      symbol: "AAPL",
      title: "Apple Announces New iPhone Model",
      content:
        "Apple has unveiled its latest iPhone model with revolutionary AI capabilities, expected to boost sales significantly. The new device features improved battery life and an enhanced camera system.",
      publishedOn: "5 minutes ago",
      provider: "AI Bank",
    },
    {
      symbol: "GOOGL",
      title: "Google Cloud Expands to New Regions",
      content:
        "Google Cloud has announced a major expansion to new regions, increasing its global market share and challenging competitors. This move is expected to improve service for customers in previously underserved areas.",
      publishedOn: "10 minutes ago",
      provider: "Tech Insights",
    },
    {
      symbol: "MSFT",
      title: "Microsoft's AI Integration Receives Positive Feedback",
      content:
        "Microsoft's latest AI integration in its Office suite has received overwhelmingly positive feedback from users and industry experts. The stock price has surged following the announcement.",
      publishedOn: "15 minutes ago",
      provider: "Market Watch",
    },
    {
      symbol: "AMZN",
      title: "Amazon Launches Drone Delivery in New Cities",
      content:
        "Amazon has expanded its drone delivery service to several new cities, revolutionizing last-mile logistics. This move is expected to significantly reduce delivery times and costs.",
      publishedOn: "20 minutes ago",
      provider: "E-commerce Today",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#003E77] border-b-2 border-[#1877F2] pb-4">
        Latest Stock Market News
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {newsData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-semibold text-[#1877F2] flex-grow pr-4">
                {item.title}
              </h2>
              <span className="text-sm font-bold bg-[#D9E8FB] text-[#003E77] px-3 py-1 rounded-full whitespace-nowrap">
                {item.symbol}
              </span>
            </div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {item.content}
            </p>
            <div className="flex justify-between items-end text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                Published: {item.publishedOn}
              </span>
              <span className="italic">Provider: {item.provider}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
