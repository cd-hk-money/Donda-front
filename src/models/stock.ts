
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


export interface StockRecommendModel {
  code: string
  name: string
  close: number
  changes_ratio: number
}

export interface IStockModel {
  date : string
  code: string
  name: string
  market: string
  close: number
  changes: number
  changes_ratio: number
  open: number
  high: number
  low: number
  amount: number
  marcap: number
  stocks: number
}

// export interface IStockStatementModel {
//   [date: string]: Array<any>
// }

export interface IStockStatementChartModel {
  date: string[] 
  value: number[]
}

export interface IStockStatementModel {
  asset?: IStockStatementChartModel
  cash?: IStockStatementChartModel
  current_asset?: IStockStatementChartModel
  ebitda?: IStockStatementChartModel
  equity?: IStockStatementChartModel
  equity_non?: IStockStatementChartModel
  gross_margin?: IStockStatementChartModel
  liability?: IStockStatementChartModel
  profit?: IStockStatementChartModel
  profit_non?: IStockStatementChartModel
  revenue?: IStockStatementChartModel  
}

export const statement: IStockStatementModel = {
  asset: {
    date: ['날짜1', '날짜2', '날짜3', '날짜4'],
    value: [111, 2222, 3333 ,444]
  },
  cash: {
    date: ['날짜1', '날짜2', '날짜3', '날짜4'],
    value: [111, 2222, 3333 ,444]
  }
}

const example= {
  기존모델: {},
  차트모델: {}
}








