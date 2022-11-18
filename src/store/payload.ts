import {
  createAxiosGetRequestCallback,
  getStockUrl,  
  getStockGraphDefaultUrl,
  getStockGraphAllUrl,
  getStockEvaluationUrl,
  getStockEvaluationDailyUrl,
  getStockSimilarContentsUrl,
  getStockNewsUrl,
  getStockStatementUrl,
  getStockStatementAllUrl,
  getStockIndicatorUrl,
  getStockIndicatorDailyUrl, 
  getStockIndicatorSectorDailyUrl, 
  getStockIndicatorSectorUrl,
  getStockVolumeUrl,
  HEADER,
} from '@/api/stocks'

import {
  IStock,
  IStockSimilar,
  IStockNews,
  IStockStatement,
  IStockEvaluationDaily,
  IStockGraph,
  StockStatementAll,  
  ResponseType,
  IStockIndicator,
  IStockIndicatorDaily,
  IStockIndicatorSector,
  IStockIndicatorSectorDaily,
  IStockGraphVolume
} from '@/api/types'

import { convertChartData } from '@/mixins/tools'
import axios, { AxiosResponse } from 'axios'

export type AsyncPayload<T extends ResponseType = any> = {
  state: string,
  asyncCallback: () => Promise<AxiosResponse<T, unknown>> | Promise<AxiosResponse<T, unknown>[]>
  compute?: (response?: AxiosResponse<T> | AxiosResponse<T>[]) => unknown  
}

export const reducer = (acc: { PBR: { type: string; eps: number; bps: number; roe: number }[]; PER: { type: string; eps: number; bps: number; roe: number }[]; PSR: { type: string; eps: number; bps: number; roe: number }[] }, cur: IStockIndicator) => {
  acc.PBR.push(cur.PBR)
  acc.PER.push(cur.PBR)
  acc.PSR.push(cur.PBR)
  return acc    
}


const createStoreActionPayload = <T extends ResponseType>(state, callback, compute?): AsyncPayload<T> => ({
  state,
  asyncCallback: callback,
  compute: compute || ((response: AxiosResponse<T>) => response.data)
})

const statementParser = (response: AxiosResponse<IStockStatement>) => {
  const label = Object.keys(response.data)
  const value = Object.values(response.data)           
  const keys = Object.keys(value[0][0])  

  return convertChartData(keys, value, label)
}

const indicatorParser = (response: AxiosResponse<IStockIndicator>) => {
  const label = Object.keys(response.data).slice(0, 4)      
  const value = Object.values(response.data).slice(0, 4)
  const keys = Object.keys(value[0][0]).slice(1) 

  return convertChartData(keys, value, label)  
}

const indicatorDailyParser = (response: AxiosResponse<IStockIndicator>) => {
  return Object
    .values(response.data)
    .slice(0, -9)
    .map(arr => arr[0])
    .reduce(reducer, { PBR: [], PER: [], PSR: [] }) 
}

const indicatorSectorDailyParser = (response: AxiosResponse<IStockIndicatorSectorDaily>) => {
  return Object
    .values(response.data)
    .map(arr => arr[0])
    .reduce(reducer, { PBR: [], PER: [], PSR: [] }) 
}

const getStocksAsync = (codes: string[]) => async () => await axios.all(codes.map(code => axios.get<IStock>(`/stock/${code}`), HEADER)) 

export const getStock                      = (code: string) => createStoreActionPayload('stock'                , createAxiosGetRequestCallback<IStock>(getStockUrl(code)))    
export const getStockGraphDefault          = (code: string) => createStoreActionPayload('stockGraphDefault'    , createAxiosGetRequestCallback<IStockGraph>(getStockGraphDefaultUrl(code)), (response: AxiosResponse<IStockGraph>) => response.data.origin)
export const getStockGraphAll              = (code: string) => createStoreActionPayload('stockGraphAll'        , createAxiosGetRequestCallback<IStockGraph>(getStockGraphAllUrl(code)), (response: AxiosResponse<IStockGraph>) => response.data.origin)
export const getStockEvaluation            = (code: string) => createStoreActionPayload('stockEvaluation'      , createAxiosGetRequestCallback(getStockEvaluationUrl(code)))
export const getStockEvaluationDaily       = (code: string) => createStoreActionPayload('stockEvaluationDaily' , createAxiosGetRequestCallback<IStockEvaluationDaily>(getStockEvaluationDailyUrl(code)))
export const getStockSimilarContents       = (code: string) => createStoreActionPayload('similarContents'      , createAxiosGetRequestCallback<IStockSimilar[]>(getStockSimilarContentsUrl(code)))
export const getStockNews                  = (code: string) => createStoreActionPayload('news'                 , createAxiosGetRequestCallback<IStockNews[]>(getStockNewsUrl(code)))
export const getStockStatement             = (code: string) => createStoreActionPayload('statement'            , createAxiosGetRequestCallback<IStockStatement>(getStockStatementUrl(code)), statementParser)
export const getStockIndicator             = (code: string) => createStoreActionPayload('indicator'            , createAxiosGetRequestCallback<IStockIndicator>(getStockIndicatorUrl(code)), indicatorParser)
export const getStockIndicatorDaily        = (code: string) => createStoreActionPayload('indicatorDaily'       , createAxiosGetRequestCallback<IStockIndicatorDaily>(getStockIndicatorDailyUrl(code)), indicatorDailyParser)
export const getStockIndicatorSector       = (code: string) => createStoreActionPayload('indicatorSector'      , createAxiosGetRequestCallback<IStockIndicatorSector>(getStockIndicatorSectorUrl(code)))
export const getStockIndicatorSectorDaily  = (code: string) => createStoreActionPayload('indicatorSectorDaily' , createAxiosGetRequestCallback<IStockIndicatorSectorDaily>(getStockIndicatorSectorDailyUrl(code)), indicatorSectorDailyParser)
export const getStockVolume                = (code: string) => createStoreActionPayload('stockGraphVolume'     , createAxiosGetRequestCallback<IStockGraphVolume>(getStockVolumeUrl(code)), (response: AxiosResponse<StockStatementAll>) => response.data.origin)
export const getStockStatementAll          = (code: string, statementType: string) => createStoreActionPayload(statementType, createAxiosGetRequestCallback(getStockStatementAllUrl(code, statementType)), (response: AxiosResponse<StockStatementAll>) => response.data.origin)

export const getStocks = (codes: string[]) => createStoreActionPayload<IStock>('recommendStocks', getStocksAsync(codes), (reses: AxiosResponse[]) => reses.map(response => response.data))
