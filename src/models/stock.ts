import { IStockIndicatorSectorResponse, IStockEvaluationDailyResponse, IStockEvaluationResponse, IStockNewsResponse, IStockResponse, IStockSimilarResponse } from "@/api/types"

export interface SingleStock {
  title?: string
  code: string
  name?: string
  market?: string
}

export interface StockSimpleModel extends SingleStock { 
 stock?: number 
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






export interface IStockIndicatorDailyModel {
  [indicatorType: string]: number[]
}

export interface IStockEvaluationModel {
  date: string[],
  value: string[]
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
export type IndicatorSectorType = IStockIndicatorSectorResponse
export type IndicatorDailyType = ISectorDaily
export type IndicatorSectorDailyType = {
  value: ISectorDaily,
  date: string[]
}
export type DondaType = IStockEvaluationDailyResponse
export type StocksType = IStockResponse[]






