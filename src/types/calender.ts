export interface Split {
  date: string;
  symbol: string;
  numerator: number;
  denominator: number;
  type: string;
  ratio: string;
}

export interface Earning {
  symbol: string;
  date: string;
  exchange: string;
  when: string;
  //time: string;
}

export interface IPO {
  date: string;
  symbol: string;
  company: string;
  exchange: string;
  shares: number;
  priceRange: string;
  marketCap: number;
}
