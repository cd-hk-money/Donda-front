export interface SingleStock {
  title?: string
  code: string
  name?: string
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
  date?: string
  code?: string
  name?: string
  title?: string
  market?: string
  close?: number
  changes?: number
  changes_ratio?: number
  open?: number
  high?: number
  low?: number
  amount?: number
  marcap?: number
  stocks?: number
  per?: number
  pbr?: number
}


// chart
export interface ISimpleChartData {
  [type: string]: IStockStatementBarChartModel
}

export interface IStockStatementBarChartModel {
  date: string[] 
  value: number[]
}



// indicator
export interface IStockIndicatorModel {
  [indicatorType: string]: {
    date: string[]
    value: number[]
  }
}

export interface IStockIndicatorSectorModel {
  date: string[]
  sector_eps?: number[]
  sector_bps?: number[]
  sector_roe?: number[]
}

export interface IStockIndicatorSectorDailyModel {
  [date: string]: {
    per: number | undefined
    pbr: number | undefined
    psr: number | undefined
  }
}

export interface IStockIndicatorDailyModel {
  [indicatorType: string]: number[]
}


// statement
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

export interface IStockEvaluationModel {
  date: string[],
  value: string[]
}

export interface IStockLineChartModel {
  [date: string]: number
}



/**
 * `/stock/${name}/indicator`
 */
export interface IStockIndicatorModelV2 {

  // 분기 보조지표
  quarter: {
    [date: string]: {
      eps: number | undefined
      bps: number | undefined
      roe: number | undefined
    }
  }

  // 일일 보조지표
  daily: {
    [date: string]: {
      per: number | undefined
      pbr: number | undefined
      psr: number | undefined
    }
  }
}





