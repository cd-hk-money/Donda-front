export interface MarketDescModel {
  market: string
  close: string 
  trans: string 
  code: string
}

export interface MarketModel {
  type?: string,
  open?: number,
  close?: number,
  high?: number,
  low?: number,
  changes?: number,
  volume?: number
}

export interface IMarketChartModel {
  [marketType: string]: {
    labels: string[],
    values: (MarketModel | unknown)[]
  }      
}

export interface IMarketRecentModel {  
  [marketType: string]: {
    close?: number,
    changes?: number,
    recent?: string
  }
}
