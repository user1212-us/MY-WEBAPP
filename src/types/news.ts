export interface NewsArticleEn {
  title: string; // Original English title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
  text: string;
}

export interface NewsArticle {
  titleEn: string; // Original English title
  titleAr: string; // Translated Arabic title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
  text: string;
}

// Define the news interface
export interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
  text: string;
}

//for twitter they will contain also the text
export interface NewsArticleEnTwitter {
  title: string; // Original English title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
  text: string;
}

export interface NewsArticleTwitter {
  titleEn: string; // Original English title
  titleAr: string; // Translated Arabic title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
  textAr: string;
}
