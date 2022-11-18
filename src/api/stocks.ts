import axios, { AxiosRequestConfig } from "axios"

import { ResponseType } from './types'

export const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}

export const createAxiosGetRequestCallback = <T extends ResponseType>(url: string) => async () => await axios.get<T>(url, HEADER)

export const getStockUrl = (code: string) => `/stock/${code}`
export const getStockGraphDefaultUrl = (code: string) => `/stock/${code}/price` 
export const getStockGraphAllUrl = (code: string) => `/stock/${code}/years-price`
export const getStockEvaluationUrl = (code: string) => `/stock/${code}/evaluation`
export const getStockEvaluationDailyUrl = (code: string) => `/stock/${code}/evaluation/daily`
export const getStockSimilarContentsUrl = (code: string) => `/stock/${code}/similar`
export const getStockNewsUrl = (code: string) => `/stock/${code}/news`
export const getStockStatementUrl = (code: string) => `/stock/${code}/statement`
export const getStockStatementAllUrl = (code: string, statementType: string) => `/stock/${code}/statement/${statementType}`
export const getStockIndicatorUrl = (code: string) => `/stock/${code}/indicator`
export const getStockIndicatorDailyUrl = (code: string) => `/stock/${code}/indicator/daily`
export const getStockVolumeUrl = (code: string) => `/stock/${code}/years-volume`
export const getStockIndicatorSectorUrl = (code: string) => `/stock/${code}/sector`
export const getStockIndicatorSectorDailyUrl = (code: string) => `/stock/${code}/sector/daily`



