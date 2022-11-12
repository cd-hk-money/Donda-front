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