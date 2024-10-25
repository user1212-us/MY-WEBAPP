// utils/tweetTemplate.ts
export const createTweetTemplate = (
  symbol: string,
  title: string,
  text: string,
  sentiment: string
) => {
  // const arabicMessage =
  //  "إذا كنت ترغب في متابعة آخر أخبار الأسهم أو الاستفسار عن سهم معين، يرجى زيارة الموقع";

  const hashtags = [
    "الاسهم_السعودية",
    "تاسي",
    "تاسي_تداول",
    "السوق_الامريكي",
    "الاسهم_الامريكيه",
  ];
  // Join the hashtags with spaces, and ensure they are prefixed with '#'
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
  // Return the tweet template
  return (
    "\u202B" + // Start Right-to-Left embedding
    `$${symbol} ` +
    "\n" +
    `${sent}` +
    "\n" +
    "\n" +
    `${title} ` +
    "\n" +
    "\n" +
    `${text} ` +
    "\n" +
    "\n" +
    `${formattedHashtags}` +
    "\u202C"
  ); // End Right-to-Left embedding;
};
