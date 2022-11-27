export interface IStockResponse {
  amount: number
  changes: number
  close: number
  code: string
  date: string
  high: number
  low: number
  marcap: number
  market: string
  name: string
  open: number
  pbr: number | null
  per: number | null
  psr: number | null
  sector: string
  stocks: number
  volume: number
  changes_ratio?: number
}

export interface IStockSimilarResponse {
  changes: number
  changes_ratio: number
  close: number
  code: string
  evaluation_score: number
  market: string
  name: string
}

export interface IStockNewsResponse {
  subject: string
  summary: string
  url: string
}

export type StockStatementElement = {
  type: string 
  asset: number    
  cash: number    
  current_asset: number    
  ebitda: number    
  equity: number    
  equity_non: number    
  gross_margin: number    
  liability: number    
  profit: number    
  profit_non: number    
  revenue: number 
}

export interface IStockStatementResponse {
  [date: string]: StockStatementElement
}

export interface IStockEvaluationDailyResponse {
  date: string[]
  value: number[]
}

export interface StockStatementAllResponse {
  close: {
    date: string[]
    value: number[]
  },
  origin: {
    [date: string]: number
  }
}

export interface IStockGraphResponse {
  close: {
    date: string[],
    values: number[]
  }
  origin: {
    [code: string]: number
  }
}

export interface IStockIndicatorResponse {
  [date: string]: {
    type: string
    eps: number
    bps: number
    roe: number
  }
}

export interface IStockIndicatorDailyResponse {
  [date: string]: {
    PER: number
    PBR: number
    PSR: number
  }
}

export interface IStockIndicatorSectorResponse {
  date: string[]
  sector_bps: number[]
  sector_eps: number[]
  sector_roe: number[]
}

export interface IStockIndicatorSectorDailyResponse {
  [date: string]: {
    per: number
    pbr: number
    psr: number
  }
}

export interface IStockGraphVolumeResponse {
  close: {
    date: string[]
    value: number[]
  }
  origin: {
    [date: string] : number
  }
}

export interface IStockRecommendResponse {
  name: string
  close: number
  changes_ratio: number
}

export interface IStockEvaluationResponse {
  date: string[]
  ['S-rim']: number[]
  ['proper-price']: number[]
}




type MarketType = 'KOSPI' | 'NASDAQ' | 'S&P500' | 'US1YT' | 'US5YT' | 'US10YT' | 'USD/KRW'
type RankType = 'change_incr' | 'change_redu' | 'marcap' | 'volume'

export type MarketResponse = {
  [date: string]: {
    [marketType in MarketType]: {
      changes: number
      close: number
      high: number
      low: number
      open: number
      volume: number
    }
  }[]
}

export type MarketValuationResponse = {
  market: MarketType
  monthlyTrend: number
  weeklyTrend: number
  weeklyTrend2: number
}[]

export type SearchTableResponse = {
 [code: string]: string 
}

export type DailySimpleRankResponse = {
  [rankType in RankType]: (number | string)[]  
}



export type ResponseType = 
  IStockResponse | 
  IStockSimilarResponse[] | 
  IStockNewsResponse[] | 
  IStockStatementResponse | 
  IStockEvaluationDailyResponse | 
  StockStatementAllResponse | 
  IStockGraphResponse | 
  IStockIndicatorResponse |
  IStockIndicatorDailyResponse |
  IStockIndicatorSectorResponse |
  IStockIndicatorSectorDailyResponse |
  IStockGraphVolumeResponse |
  IStockRecommendResponse[] | 
  IStockEvaluationResponse |

  
  MarketResponse | 
  MarketValuationResponse | 
  SearchTableResponse | 
  DailySimpleRankResponse