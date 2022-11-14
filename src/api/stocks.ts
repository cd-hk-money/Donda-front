import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { convertChartData } from "@/mixins/tools"

import {
  IStock,
  IStockSimilar,
  IStockNews,
  IStockStatement,
  IStockEvaluationDaily,
  StockStatementAll,
  IStockGraph
} from './types'

const getStockUrl = (code: string) => `/stock/${code}`
const getStockGraphDefaultUrl = (code: string) => `/stock/${code}/price` 
const getStockGraphAllUrl = (code: string) => `/stock/${code}/years-price`
const getStockEvaluationUrl = (code: string) => `/stock/${code}/evaluation`
const getStockEvaluationDailyUrl = (code: string) => `/stock/${code}/evaluation/daily`
const getStockSimilarContentsUrl = (code: string) => `/stock/${code}/similar}`
const getStockNewsUrl = (code: string) => `/stock/${code}/news`
const getStockStatementUrl = (code: string) => `/stock/${code}/statement`
const getStockStatementAllUrl = (code: string, statementType: string) => `/stock/${code}/statement/${statementType}`


export type ResponseType = IStock | IStockSimilar[] | IStockNews[] | IStockStatement | IStockEvaluationDaily | StockStatementAll | IStockGraph

export type AsyncPayload<T extends ResponseType = any> = {
  state: string,
  asyncCallback: () => Promise<AxiosResponse<T, unknown>> | Promise<AxiosResponse<T, unknown>[]>
  compute?: (response?: AxiosResponse<T> | AxiosResponse<T>[]) => unknown  
}

const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}


const createStoreActionPayload = <T extends ResponseType>(state, callback, compute?): AsyncPayload<T> => ({
  state,
  asyncCallback: callback,
  compute: compute || ((response: AxiosResponse<T>) => response.data)
})

const createAxiosGetRequestCallback = <T extends ResponseType>(url: string) => async () => await axios.get<T>(url, HEADER)

/*  응답 객체 파서들. 분리 예정  */
const statementParser = (response: AxiosResponse<IStockStatement>) => {
  const label = Object.keys(response.data)
  const value = Object.values(response.data)           
  const keys = Object.keys(value[0][0])  

  return convertChartData(keys, value, label)
}


/*  스토어 요청 디스패치 PAYLOAD 객체들  */
export const getStock                 = (code: string) => createStoreActionPayload('stock'                , createAxiosGetRequestCallback<IStock>(getStockUrl(code)))    
export const getStockGraphDefault     = (code: string) => createStoreActionPayload('stockGraphDefault'    , createAxiosGetRequestCallback<IStockGraph>(getStockGraphDefaultUrl(code)), (response: AxiosResponse<IStockGraph>) => response.data.origin)
export const getStockGraphAll         = (code: string) => createStoreActionPayload('stockGraphAll'        , createAxiosGetRequestCallback<IStockGraph>(getStockGraphAllUrl(code)), (response: AxiosResponse<IStockGraph>) => response.data.origin)
export const getStockEvaluation       = (code: string) => createStoreActionPayload('stockEvaluation'      , createAxiosGetRequestCallback(getStockEvaluationUrl(code)))
export const getStockEvaluationDaily  = (code: string) => createStoreActionPayload('stockEvaluationDaily' , createAxiosGetRequestCallback<IStockEvaluationDaily>(getStockEvaluationDailyUrl(code)))
export const getStockSimilarContents  = (code: string) => createStoreActionPayload('similarContents'      , createAxiosGetRequestCallback<IStockSimilar[]>(getStockSimilarContentsUrl(code)))
export const getStockNews             = (code: string) => createStoreActionPayload('news'                 , createAxiosGetRequestCallback<IStockNews[]>(getStockNewsUrl(code)))
export const getStockStatement        = (code: string) => createStoreActionPayload('statement'            , createAxiosGetRequestCallback<IStockStatement>(getStockStatementUrl(code)), statementParser)    

export const getStockStatementAll     = (code: string, statementType: string) => createStoreActionPayload(statementType, createAxiosGetRequestCallback(getStockStatementAllUrl(code, statementType)), (response: AxiosResponse<StockStatementAll>) => response.data.origin)
export const getStocks = (codes: string[]) => createStoreActionPayload<IStock>('recommendStocks', getStocksAsync(codes), (reses: AxiosResponse[]) => reses.map(response => response.data))

const getStocksAsync = (codes: string[]) => async () => await axios.all(codes.map(code => axios.get<IStock>(`/stock/${code}`), HEADER)) 



