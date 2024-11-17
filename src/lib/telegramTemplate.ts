// utils/telegramMessageTemplate.ts
export const createTelegramMessageTemplate = (
  symbol: string,
  title: string,
  text: string,
  sentiment: string
) => {
  const hashtags = [
    "الاسهم_السعودية",
    "تاسي",
    "تاسي_تداول",
    "السوق_الامريكي",
    "الاسهم_الامريكيه",
  ];
  const formattedHashtags = hashtags.map((tag) => `#${tag}`).join(" ");

  const getSentiment = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "ايجابي";
      case "negative":
        return "سلبي";
      default:
        return "محايد";
    }
  };
  const sent = `تأثير الخبر: ${getSentiment(sentiment)}`;

  return (
    "\u202B" + // Start Right-to-Left embedding for Arabic
    `🔹 *$${symbol}*` + // Symbol in bold
    "\n" +
    `🔸 ${sent}` + // Sentiment
    "\n\n" +
    `*${title}*` + // Title in bold
    "\n\n" +
    `${text}` + // Main text
    "\n\n" +
    `${formattedHashtags}` + // Hashtags
    "\u202C" // End Right-to-Left embedding
  );
};
