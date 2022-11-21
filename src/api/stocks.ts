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

export const getStockUrl = (code: string) => `${API}/stock/${code}`
export const getStockGraphDefaultUrl = (code: string) => `${API}/stock/${code}/price` 
export const getStockGraphAllUrl = (code: string) => `${API}/stock/${code}/years-price`
export const getStockEvaluationUrl = (code: string) => `${API}/stock/${code}/evaluation`
export const getStockEvaluationDailyUrl = (code: string) => `${API}/stock/${code}/evaluation/daily`
export const getStockSimilarContentsUrl = (code: string) => `${API}/stock/${code}/similar`
export const getStockNewsUrl = (code: string) => `${API}/stock/${code}/news`
export const getStockStatementUrl = (code: string) => `${API}/stock/${code}/statement`
export const getStockStatementAllUrl = (code: string, statementType: string) => `${API}/stock/${code}/statement/${statementType}`
export const getStockIndicatorUrl = (code: string) => `${API}/stock/${code}/indicator`
export const getStockIndicatorDailyUrl = (code: string) => `${API}/stock/${code}/indicator/daily`
export const getStockVolumeUrl = (code: string) => `${API}/stock/${code}/years-volume`
export const getStockIndicatorSectorUrl = (code: string) => `${API}/stock/${code}/sector`
export const getStockIndicatorSectorDailyUrl = (code: string) => `${API}/stock/${code}/sector/daily`



