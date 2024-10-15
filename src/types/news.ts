export interface NewsArticleEn {
  title: string; // Original English title
  symbol: string;
  publishedDate: string;
  site: string;
}

export interface NewsArticle {
  titleEn: string; // Original English title
  titleAr: string; // Translated Arabic title
  symbol: string;
  publishedDate: string;
  site: string;
}

// Define the news interface
export interface NewsAr {
  titleAr: string;
  symbol: string;
  publishedDate: string;
  site: string;
}
