import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { StockSimpleModel, StockDetailModel } from '@/models/stock'
import axios from 'axios'

const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}


@Module({namespaced: true})
export default class StockStore extends VuexModule {

  // state
  public title: string = ''               // Search 컴포넌트 title 

  public loading: boolean = false
  public loaded: boolean = false
  public subsideLoading: boolean = false
  public detailsLoading: boolean = false

  public stocks!: StockSimpleModel[]     // 상장된 모든 종목        
  public stock!: StockDetailModel | null   // 검색한 종목 하나에 대한 주가 정보
  public allStock!: any

  public subscribe!: StockSimpleModel[]   // 구독 여부

  // getters
  get nameMappingCode(): StockSimpleModel[] {
    return this.stocks
  }

  get searchTable(): Array<string> {
    return this.stocks.map(stock => stock.title)
  }

  @Mutation
  public updateStocks(stocks: any) {
    this.stocks = stocks.map((stock: Array<number | string | boolean>) => {
      return {
        title: stock[1],
        code: stock[0],
        stock: stock[4]
      }
    })
  }

  @Mutation
  public updateStock(stock: any) {
    this.stock = stock.map((stock: any) => {
      return {
        title: stock.title,
        renewalDate: stock.renewal
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

  @Action
  public async searchContents (payload: string) {
    console.log(payload)
    try {
      this.context.commit('updateLoading', true)
      const root = parseInt(payload) ? 'findByCode' : 'findByName'
      const res = await axios.get(`/${root}/${payload}/30`, HEADER)
      this.context.commit('updateLoading', false)
      console.log(this.allStock)
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
      this.context.commit('updateLoaded', true)

    } catch(e) {
      console.log(e)
    }
  }  
}
