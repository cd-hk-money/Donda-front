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

const createAxiosGetRequest = <T extends ResponseType>(url: string) => async () => await axios.get<T>(url, HEADER)

/*  응답 객체 파서들. 분리 예정  */
const statementParser = (response: AxiosResponse<IStockStatement>) => {
  const label = Object.keys(response.data)
  const value = Object.values(response.data)           
  const keys = Object.keys(value[0][0])  

  return convertChartData(keys, value, label)
}


/*  API 요청 비동기 콜백 함수들  */
// const getStockAsync = createAxiosGetRequest(url)
const getStockGraphDefaultAsync = (url: string) => createAxiosGetRequest<IStockGraph>(url)
const getStockGraphAllAsync = async (code: string) => await axios.get<IStockGraph>(`/stock/${code}/years-price`, HEADER)
const getStockEvaluationAsync = async (code: string) => await axios.get<unknown>(`/stock/${code}/evaluation`, HEADER)
const getStockEvaluationDailyAsync = async (code: string) => await axios.get<IStockEvaluationDaily>(`/stock/${code}/evaluation/daily`, HEADER)
const getStockSimilarContentsAsync = async (code: string) => await axios.get<IStockSimilar[]>(`/stock/${code}/similar`, HEADER)
const getStockNewsAsync = async (code: string) => await axios.get<IStockNews[]>(`/stock/${code}/news`, HEADER)
const getStockStatementAsync = async (code: string) => await axios.get<IStockStatement>(`/stock/${code}/statement`, HEADER)
const getStockStatementAllAsync = async ({ code, statementType }: {code: string, statementType: string}) => await axios.get<StockStatementAll>(`/stock/${code}/statement/${statementType}`, HEADER)

// 혼자만 axios.all써서 난감하네..
const getStocksAsync = (codes: string[]) => async () => await axios.all(codes.map(code => axios.get<IStock>(`/stock/${code}`), HEADER)) 



/*  스토어 요청 디스패치 PAYLOAD 객체들  */
export const getStock = (code: string) => createStoreActionPayload("stock", createAxiosGetRequest(getStockUrl(code)))    

export const getStocks = (codes: string[]) => 
  createStoreActionPayload<IStock>('recommendStocks', getStocksAsync(codes), (reses: AxiosResponse[]) => reses.map(response => response.data))
  
export const getStockGraphDefault = (code: string) => 
  createStoreActionPayload('stockGraphDefault', getStockGraphDefaultAsync(`/stock/${code}/price`), (response: AxiosResponse) => response.data.origin)

export const getStockGraphAll = (code: string) => 
  createStoreActionPayload('stockGraphAll', () => getStockGraphAllAsync(code), (response: AxiosResponse) => response.data.origin)

export const getStockEvaluation = (code: string) =>
  createStoreActionPayload('stockEvaluation', () => getStockEvaluationAsync(code))

export const getStockEvaluationDaily = (code: string) => 
  createStoreActionPayload('stockEvaluationDaily', () => getStockEvaluationDailyAsync(code))

export const getStockSimilarContents = (code: string) => 
  createStoreActionPayload('similarContents', () => getStockSimilarContentsAsync(code))
  
export const getStockNews = (code: string) =>
  createStoreActionPayload('news', () => getStockNewsAsync(code))

export const getStockStatement = (code: string) => 
  createStoreActionPayload('statement', () => getStockStatementAsync(code), statementParser)

export const getStockStatementAll = (code: string, statementType: string) =>
   createStoreActionPayload('statementAll', () => getStockStatementAllAsync({ code, statementType }), (response: AxiosResponse<StockStatementAll>) => response.data.origin)


