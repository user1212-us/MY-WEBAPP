export interface Signal {
  id: number; // id is a number
  symbol: string;
  type: string;
  enterPrice: number;
  priceNow: number;
  firstTarget: number;
  secondTarget: number;
  dateOpened: string;
}

export interface RawSignal {
  id: number;
  symbol: string;
  type: string;
  enter_price: number;
  price_now: number;
  first_target: number;
  second_target: number;
  date_opened: string;
}

export interface SignalHistory {
  id: number;
  symbol: string;
  in_price: number;
  out_price: number;
  entrance_date: string;
  closing_date: string;
}

export interface News {
  symbol: string;
  site: string;
  title: string;
  text: string;
  publishedDate: string;
}
