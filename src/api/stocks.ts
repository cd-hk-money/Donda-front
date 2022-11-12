import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { convertChartData } from "@/mixins/tools"
const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}

export interface IStock {
  amount: number
  changes: number
  close: number
  code: string
  date: string
  high: number
  low: number
  marcap: number
  market: string
  name: string
  open: number
  pbr: number | null
  per: number | null
  psr: number | null
  sector: string
  stocks: number
  volume: number
}

export interface IStockSimilar {
  changes: number
  changes_ratio: number
  close: number
  code: string
  evaluation_score: number
  market: string
  name: string
}

export interface IStockNews {
  subject: string
  summary: string
  url: string
}

export type StockStatementElement = {
  type: string 
  asset: number    
  cash: number    
  current_asset: number    
  ebitda: number    
  equity: number    
  equity_non: number    
  gross_margin: number    
  liability: number    
  profit: number    
  profit_non: number    
  revenue: number 
}

export interface IStockStatement {
  [date: string]: StockStatementElement
}

export interface IStockEvaluationDaily {
  date: string[]
  value: number[]
}

export interface StockStatementAll {
  close: {
    date: string[]
    value: number[]
  },
  origin: {
    [date: string]: number
  }
}

export interface IStockGraph {
  close: {
    date: string[],
    values: number[]
  }
  origin: {
    [code: string]: number
  }
}

export const getStockAsync = async (code: string) => 
  await axios.get<IStock>(`/stock/${code}`, HEADER)

export const getStocksAsync = async (codes: string[]) => 
  await axios.all(codes.map(code => axios.get<IStock>(`/stock/${code}`), HEADER)) 

export const getStockGraphDefaultAsync = async (code: string) => 
  await axios.get<IStockGraph>(`/stock/${code}/price`, HEADER)

export const getStockGraphAllAsync = async (code: string) => 
  await axios.get<IStockGraph>(`/stock/${code}/years-price`, HEADER)

export const getStockEvaluationAsync = async (code: string) => 
  await axios.get<unknown>(`/stock/${code}/evaluation`, HEADER)

export const getStockEvaluationDailyAsync = async (code: string) => 
  await axios.get<IStockEvaluationDaily>(`/stock/${code}/evaluation/daily`, HEADER)

export const getStockSimilarContentsAsync = async (code: string) => 
  await axios.get<IStockSimilar[]>(`/stock/${code}/similar`, HEADER)

export const getStockNewsAsync = async (code: string) => 
  await axios.get<IStockNews[]>(`/stock/${code}/news`, HEADER)

export const getStockStatementAsync = async (code: string) => 
  await axios.get<IStockStatement>(`/stock/${code}/statement`, HEADER)

export const getStockStatementAllAsync = async ({ code, statementType }: {code: string, statementType: string}) => 
  await axios.get<StockStatementAll>(`/stock/${code}/statement/${statementType}`, HEADER)


export type AsyncPayload<T = any> = {
  state: string,
  asyncCallback: () => Promise<AxiosResponse<T, unknown>>
  compute?: (res?: AxiosResponse<T> | AxiosResponse<T>[]) => unknown
}
  
/**
 * @param state       변경시킬 store의 state
 * @param callback    호출할 비동기 콜백 함수
 * @param compute     입력값에 대한 재연산 함수
 * @returns           AsyncPayload<T>
 */
const createStoreActionPayload = <T extends AxiosResponse>(state, callback, compute?): AsyncPayload<T> => ({
  state,
  asyncCallback: callback,
  compute : compute || ((res: T) => res.data)
})

export const getStock = (code: string) => 
  createStoreActionPayload("stock", () => getStockAsync(code))

  
export const getStocks = (codes: string[]) => 
  createStoreActionPayload('recommendStocks', () => getStocksAsync(codes), (reses: AxiosResponse<IStock>[]) => reses.map(res => res.data))


export const getStockGraphDefault = (code: string) => 
  createStoreActionPayload('stockGraphDefault', () => getStockGraphDefaultAsync(code), (res: AxiosResponse<IStockGraph>) => res.data.origin)

export const getStockGraphAll = (code: string) => 
  createStoreActionPayload('stockGraphAll', () => getStockGraphAllAsync(code), (res: AxiosResponse<IStockGraph>) => res.data.origin)


export const getStockEvaluation = (code: string) => 
  createStoreActionPayload('stockEvaluation', () => getStockEvaluationAsync(code))


export const getStockEvaluationDaily = (code: string) => 
createStoreActionPayload('stockEvaluationDaily', () => getStockEvaluationDailyAsync(code))


export const getStockSimilarContents = (code: string) => 
  createStoreActionPayload('similarContents', () => getStockSimilarContentsAsync(code))


export const getStockNews = (code: string) => 
  createStoreActionPayload('news', () => getStockNewsAsync(code))


export const getStockStatement = (code: string) => 
  createStoreActionPayload('statement', () => getStockStatementAsync(code), (res: AxiosResponse<IStockStatement>) => {
    const label = Object.keys(res.data)
    const value = Object.values(res.data)           
    const keys = Object.keys(value[0][0])  
    return convertChartData(keys, value, label)
  })

export const getStockStatementAll = (code: string, statementType: string) => 
  createStoreActionPayload('statementAll', () => getStockStatementAllAsync({ code, statementType }), (res: AxiosResponse<StockStatementAll>) => res.data.origin)



// type newType<T> = {
//   asyncCallback: () => Promise<AxiosResponse<T, unknown>>,
//   mutations: {
//     [state: string]: (res?: AxiosResponse<T> | AxiosResponse<T>[]) => unknown
//   }
// }



// const createStoreActionPayloads: newType<Stock> = {
//   asyncCallback: () => getStockSimilarContentsAsync('000000'),
//   mutations: {
//     "recommand": (res: AxiosResponse<Stock>[]) => res.map(re => re.data),
//   }
// }

// Object.entries(createStoreActionPayloads.mutations).map(entry => this.context.commit('success', {state: entry[0], data: entry[0](res)}))
// Object.keys(createStoreActionPayloads).forEach(key => {
//   this.context.commit('success'), { state: key, data: createStoreActionPayloads[key]('')}
// })
