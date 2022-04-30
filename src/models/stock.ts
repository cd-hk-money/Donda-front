
//
export interface StockSimpleModel {
 title: string
 code: string
 stock?: number 
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


export interface IMarketRank {
  marcap: Array<IMarketRanksContents>
  change_incr: Array<IMarketRanksContents>
  change_redu: Array<IMarketRanksContents>
  volume: Array<IMarketRanksContents>
}

export interface IMarketRanksContents {
  code: string
  title: string
  stock: number
  initialize?: number
}



// 임시. 
export interface StockRankModel {
  title: string
  code: string
  close: number
  change: number
  changeRatio: string
}

//
export interface StockPriceModel {
  Change: number
  Close: number
  High: number
  Low: number
  Open: number
  Volume: number
}

//
export interface LineChartModel {
  date: string
  value: number
}



