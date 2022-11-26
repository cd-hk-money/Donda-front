import axios, { AxiosRequestConfig } from "axios"

import { ResponseType } from './types'

export const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}

const API = process.env.VUE_APP_STOCK_API
console.log(process.env)

export const createAxiosGetRequestCallback = <T extends ResponseType>(url: string) => async () => await axios.get<T>(url, HEADER)



/**
 * 
 * 시장에 관련된 API 요청
 */


// 시장 트렌드
export const getMarketValuationUrl = () => `${API}/daily/market`

// 주식 시장
export const getTodayMarketUrl = () => `${API}/daily/trend`

// 자동완성을 위한 기업명과 코드
export const getSearchTableUrl = () => `${API}/krx-corps`

// 간단한 추천종목
export const getStockRecommendUrl = () => `${API}/daily/recommand`

// 간단한 랭킹
export const getDailySimpleRanksUrl = () => `${API}/daily/rank`




/**
 * 
 * 종목에 관련된 API 요청
 */


// 종목 정보
export const getStockUrl = (code: string) => `${API}/stock/${code}`

// 종목 간단 그래프
export const getStockGraphDefaultUrl = (code: string) => `${API}/stock/${code}/price` 

// 종목 상세 그래프
export const getStockGraphAllUrl = (code: string) => `${API}/stock/${code}/years-price`

// 종목 적정 주가 (분기)
export const getStockEvaluationUrl = (code: string) => `${API}/stock/${code}/evaluation`

// 종목 적정 주가 (일간)
export const getStockEvaluationDailyUrl = (code: string) => `${API}/stock/${code}/evaluation/daily`

// 유사 종목 
export const getStockSimilarContentsUrl = (code: string) => `${API}/stock/${code}/similar`

// 뉴스
export const getStockNewsUrl = (code: string) => `${API}/stock/${code}/news`

// 전체 재무제표
export const getStockStatementUrl = (code: string) => `${API}/stock/${code}/statement`

// 한개의 재무제표 상세
export const getStockStatementAllUrl = (code: string, statementType: string) => `${API}/stock/${code}/statement/${statementType}`

// 보조지표
export const getStockIndicatorUrl = (code: string) => `${API}/stock/${code}/indicator`

// 한개의 보조지표 상세
export const getStockIndicatorDailyUrl = (code: string) => `${API}/stock/${code}/indicator/daily`

// 종목 거래량
export const getStockVolumeUrl = (code: string) => `${API}/stock/${code}/years-volume`

// 보조지표 (섹터)
export const getStockIndicatorSectorUrl = (code: string) => `${API}/stock/${code}/sector`

// 보조표 (섹터, 일간)
export const getStockIndicatorSectorDailyUrl = (code: string) => `${API}/stock/${code}/sector/daily`

// 돈다지수
export const getStockDondaUrl = (code: string) => `${API}/stock/${code}/evaluation/donda`



