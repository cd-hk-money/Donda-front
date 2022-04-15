import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { StockSimpleModel, StockDetailModel, LineChartModel } from '@/models/stock'

import axios from 'axios'
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}


@Module({namespaced: true})
export default class StockStore extends VuexModule {

  // state
  public title = ''               
  public code = ''
    
  public loading = false
  public loaded = false
  public requestDate = 10
  
  public stocks!: StockSimpleModel[]        // 상장된 모든 종목에 대한 간단 정보
  public stocksDetail!: any                 // 상장된 모든 종목에 대한 상세 정보
  public stock!: StockDetailModel | null    // 검색한 종목 하나에 대한 주가 정보
  public searchTable!: Array<string>  

  public stockChart!: Array<LineChartModel> // 개별종목 주가 정보
  public stockDetail!: any                  // 개별종목 정보

  public subscribe!: StockSimpleModel[]   // 구독 여부

  public sparkValues!: Array<number>
  
  // getters
  get nameMappingCode(): StockSimpleModel[] {
    return this.stocks
  }

  get getStocks(): Array<StockSimpleModel> {
    return this.stocks
  }

  @Mutation
  public setCode(newCode: string): void {
    this.code = newCode
  }
  
  @Mutation
  public setTitle(title: string): void {
    this.title = title
  }
  
  @Mutation
  public setSearchTable(): void {
    this.searchTable = this.stocks.map(stock => stock.title)
  }

  @Mutation
  public updateStocks(stocks: any) {
    this.stocksDetail = stocks
    this.stocks = stocks.map((stock: Array<number | string>) => {
      return {
        title: stock[1],
        code: stock[0],
        stock: stock[4]
      }
    })
  }

  @Mutation
  public updateLoaded(payload: boolean): void {
    this.loaded = payload
  }
  
  @Mutation
  public updateLoading(payload: boolean): void {
    this.loading = payload
  }
  
  @Mutation
  public uptateTitle(payload: string): void {
    this.title = payload
  }

  @Mutation
  public updateStockChart(payload: Array<LineChartModel>): void {
    this.stockChart = payload
  }

  @Mutation
  public updateStockDetail(payload: any): void {    
    this.stockDetail = this.stocksDetail.find((stock: any) => stock[0] === payload).slice(0, 3)
  
  }

  @Mutation
  public updateRequestDate(payload: number): void {
    this.requestDate = payload
  }


  @Action
  public async searchContents (code: string): Promise<any> {
    try {
      this.context.commit('updateLoading', true)
      
      const res = await axios.get(`/findByCode/${code}/${this.requestDate}`, HEADER)      
      const chartData: Array<LineChartModel> = Object.entries(res.data).map((stock: any) => {
        return {
          date: stock[0],
          value: stock[1].Close
        }
      })
      chartData.pop()      
      this.context.commit('updateStockDetail', code)               
      this.context.commit('updateStockChart', chartData)    
      this.context.commit('updateLoading', false)   
    } catch(e) {
      console.log(e)
    }
  }

  @Action
  public async todayMarket(): Promise<void> {
    try {      
      this.context.commit('updateLoaded', false)
      const res = await axios.get(`/today`, HEADER)
      this.context.commit('updateStocks', res.data.data)
      this.context.commit('setSearchTable')   
      this.context.commit('updateLoaded', true)
    } catch(e) {
      console.log(e)
    }
  }  
  
}
