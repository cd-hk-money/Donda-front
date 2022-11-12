import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}

export type AsyncPayload<T = any> = {
  state: string
  asyncCallback: () => Promise<AxiosResponse<T, unknown>>
  computed?: (res?: AxiosResponse<T> | AxiosResponse<T>[]) => unknown
}

export interface Stock {
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

interface StockGraph {
  close: {
    date: string[],
    values: number[]
  }
  origin: {
    [code: string]: number
  }
}

export const getStockAsync = async (code: string) => 
  await axios.get<Stock>(`/stock/${code}`, HEADER)

export const getStocksAsync = async (codes: string[]) => 
  await axios.all(codes.map(code => axios.get<Stock>(`/stock/${code}`), HEADER)) 

export const getStockGraphAsync = async (code: string) => 
  await axios.get<StockGraph>(`/stock/${code}/price`, HEADER)

/**
 * 
 * @param state       변경시킬 store의 state
 * @param callback    호출할 비동기 함수
 * @param computed    입력값에 대한 재연산 함수
 * @returns 
 */
const createPayload = <T extends AxiosResponse>(state, callback, computed?): AsyncPayload<T> => ({
  state,
  asyncCallback: callback,
  computed : computed || ((res: T) => res.data)
})

export const getStock = (code: string) => createPayload('stock', () => getStockAsync(code))
export const getStocks = (codes: string[]) => createPayload('recommendStocks', () => getStocksAsync(codes), (reses: AxiosResponse[]) => reses.map(res => res.data))
