export interface IMarketValue {
  value: number;
  date: Date;
}

export interface IStockExchange {
  _id: string;
  name: string;
  description: string;
  symbol: string;
  market_values: IMarketValue[];
  created: Date;
}
