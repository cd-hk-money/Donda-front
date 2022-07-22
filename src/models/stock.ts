export interface SingleStock {
  title: string
  code: string
}

export interface StockSimpleModel extends SingleStock { 
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
  marcap: IMarketRanksContents[]
  change_incr: IMarketRanksContents[]
  change_redu: IMarketRanksContents[]
  volume: IMarketRanksContents[]
}

export interface IMarketRanksContents extends SingleStock {
  code: string
  title: string
  stock: number
  initialize?: number
}



// 임시. 
export interface StockRankModel extends SingleStock {  
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


export interface StockRecommendModel extends SingleStock {  
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
  per?: number
  pbr?: number
}

export interface ISimpleChartData {
  [type: string]: IStockStatementBarChartModel
}
export interface IStockStatementBarChartModel {
  date: string[] 
  value: number[]
}

export interface IStockStatementModel {
  asset?: IStockStatementBarChartModel
  cash?: IStockStatementBarChartModel
  current_asset?: IStockStatementBarChartModel
  ebitda?: IStockStatementBarChartModel
  equity?: IStockStatementBarChartModel
  equity_non?: IStockStatementBarChartModel
  gross_margin?: IStockStatementBarChartModel
  liability?: IStockStatementBarChartModel
  profit?: IStockStatementBarChartModel
  profit_non?: IStockStatementBarChartModel
  revenue?: IStockStatementBarChartModel  
}

export interface IStockLineChartModel {
  [date: string]: number
}







