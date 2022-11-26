export interface IStock {
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
}

export interface IStockSimilar {
  changes: number
  changes_ratio: number
  close: number
  code: string
  evaluation_score: number
  market: string
  name: string
}

export interface IStockNews {
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

export interface IStockStatement {
  [date: string]: StockStatementElement
}

export interface IStockEvaluationDaily {
  date: string[]
  value: number[]
}

export interface StockStatementAll {
  close: {
    date: string[]
    value: number[]
  },
  origin: {
    [date: string]: number
  }
}

export interface IStockGraph {
  close: {
    date: string[],
    values: number[]
  }
  origin: {
    [code: string]: number
  }
}

export interface IStockIndicator {
  [date: string]: {
    type: string
    eps: number
    bps: number
    roe: number
  }
}

export interface IStockIndicatorDaily {
  [date: string]: {
    PER: number
    PBR: number
    PSR: number
  }
}

export interface IStockIndicatorSector {
  date: string[]
  sector_bps: number[]
  sector_eps: number[]
  sector_roe: number[]
}

export interface IStockIndicatorSectorDaily {
  [date: string]: {
    per: number
    pbr: number
    psr: number
  }
}

export interface IStockGraphVolume {
  close: {
    date: string[]
    value: number[]
  }
  origin: {
    [date: string] : number
  }
}

export interface IStockRecommend {
  name: string
  close: number
  changes_ratio: number
}




type MarketType = 'KOSPI' | 'NASDAQ' | 'S&P500' | 'US1YT' | 'US5YT' | 'US10YT' | 'USD/KRW'

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

export type ResponseType = 
  IStock | 
  IStockSimilar[] | 
  IStockNews[] | 
  IStockStatement | 
  IStockEvaluationDaily | 
  StockStatementAll | 
  IStockGraph | 
  IStockIndicator |
  IStockIndicatorDaily |
  IStockIndicatorSector |
  IStockIndicatorSectorDaily |
  IStockGraphVolume |
  IStockRecommend[] | 

  
  MarketResponse | 
  MarketValuationResponse | 
  SearchTableResponse