// utils/tweetTemplate.ts
export const createTweetTemplate = (symbol: string, text: string) => {
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

  // Return the tweet template
  return (
    "\u202B" + // Start Right-to-Left embedding
    `$${symbol} ` +
    "\n" +
    "\n" +
    `${text} ` +
    "\n" +
    "\n" +
    `${formattedHashtags}` +
    "\u202C"
  ); // End Right-to-Left embedding;
};
