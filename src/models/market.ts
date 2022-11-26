import { IMarketValuationOrigin } from "@/api/types"

type MarketTypes = 'kospi' | 'nasdaq' | 'usdkrw' | 'snp500' | 'us1yt' | 'us5yt' | 'us10yt' | 'usdkrw'

export interface SingleStock {
	title?: string
	code: string
	name?: string
	market?: string
}

export interface StockRecommendModel extends SingleStock {  
  close: number
  changes_ratio: number
}

export interface IMarketRecentValueModel {
	close?: number;
	changes?: number;
	recent?: string;
}

export type IMarketRecentModel = {
	[marketType in MarketTypes]: IMarketRecentValueModel
}

export interface StockSimpleModel extends SingleStock { 
	stock?: number 
}

export interface CodeTitleMapping {
	[title: string]: string
}

export interface IDailySimpleRank {
	marcap: (number | string)[]
	change_incr: (number | string)[]
	change_redu: (number | string)[] 
	volume: (number | string)[]
}

export interface MarketModel {
	type: MarketTypes,
	open: number,
	close: number,
	high: number,
	low: number,
	changes: number,
	volume: number
}

export interface IMarketChartModel {
	kospi: {
		labels: string[]
		data: MarketModel[]
	},
	nasdaq: {
		labels: string[]
		data:  MarketModel[]  
	},
	snp500: {
		labels: string[]
		data:  MarketModel[]
	}
}

export interface IMarketValuationModel {
	market: string
	monthlyTrend: number
	weeklyTrend: number
	weeklyTrend2: number  
}







export type MarketType = {
	[marketType in MarketTypes]: {
		labels: string[]
		values: MarketModel[]
	}
}

export type MarketValuationType = IMarketValuationOrigin