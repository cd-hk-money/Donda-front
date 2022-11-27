import { IStockIndicatorDailyResponse } from './../api/types';
import { IStockEvaluationDailyResponse, IStockEvaluationResponse, IStockNewsResponse, IStockResponse, IStockSimilarResponse } from "@/api/types"

export interface SingleStock {
  title?: string
  code: string
  name?: string
  market?: string
}

export interface StockSimpleModel extends SingleStock { 
 stock?: number 
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
  sector?: string
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

export interface INewsModel {
  subject: string | undefined
  summary: string | undefined
  url: string | undefined
}

interface ISimpleStock {
  [key: string]: number
}

interface ISectorDaily {
  [indicatorType: string]: number[]
}

interface IDateValue {
  [type: string]: {
    date: string[] 
    value: number[]
  }  
}

/// new 
export type StockType = IStockResponse
export type VolumeType = ISimpleStock
export type GraphDefaultType = ISimpleStock
export type GraphAllType = ISimpleStock
export type EvaluationType = IStockEvaluationResponse
export type EvaluationDailyType = IStockEvaluationDailyResponse
export type SimilarType = IStockSimilarResponse
export type NewsType = IStockNewsResponse

export type StatementType = IDateValue
export type StatementAllType = ISimpleStock
export type IndicatorType = IDateValue
export type IndicatorSectorType = IStockIndicatorDailyResponse
export type IndicatorDailyType = ISectorDaily
export type IndicatorSectorDailyType = ISectorDaily
export type DondaType = IStockEvaluationDailyResponse
export type StocksType = IStockResponse[]






