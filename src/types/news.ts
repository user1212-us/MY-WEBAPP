export interface NewsArticleEn {
  title: string; // Original English title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
}

export interface NewsArticle {
  titleEn: string; // Original English title
  titleAr: string; // Translated Arabic title
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
}

// Define the news interface
export interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
  sentiment: string;
  sentimentScore: number;
}
