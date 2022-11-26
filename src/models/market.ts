import { DailySimpleRankResponse, MarketValuationResponse } from "@/api/types"

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





/**
 * MarketStore의 State Type들
 */

export interface IMarketValuationModel {
	market: string
	monthlyTrend: number
	weeklyTrend: number
	weeklyTrend2: number  
}

export type MarketType = {
	[marketType in MarketTypes]: {
		labels: string[]
		values: {
			type: MarketTypes
			open: number
			close: number
			high: number
			low: number
			changes: number
			volume: number
		}[]
	}
}

export type MarketValuationType = MarketValuationResponse

export type SearchTableType = {
	code: string
	title: string
}[]

export type DailySimpleRankType = DailySimpleRankResponse



/**
 * MarketStore의 Getters Type들
 */

export type MarketRecentType = {
	[marketType in MarketTypes]: {
		close?: number
		changes?: number
		recent?: string
	}
}

export interface CodeTitleMappingType {
	[title: string]: string
}