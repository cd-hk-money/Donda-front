export interface MarketDescModel {
  market: string
  close: string 
  trans: string 
  code: string
}

export interface MarketModel {
  type?: string,
  open: number,
  close: number,
  high: number,
  low: number,
  changes: number,
  volume: number
}

export interface IMarketChartModel {
  kospi: {
    labels: Array<string>
    data: Array<MarketModel>
  },
  nasdaq: {
    labels: Array<string>
    data:  Array<MarketModel>  
  },
  snp500: {
    labels: Array<string>
    data:  Array<MarketModel>
  }      
}

export interface IMarketRecentModel {
  market: string
  close: number
  changes: number
}
