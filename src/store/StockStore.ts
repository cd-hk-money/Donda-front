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
  public title = ''               
  public code = ''
  
  public loadingInfo = false
  public loading = false
  public loaded = false
  public subsideLoading = false
  public detailsLoading = false

  public stocks!: StockSimpleModel[]     // 상장된 모든 종목        
  public stock!: StockDetailModel | null   // 검색한 종목 하나에 대한 주가 정보
  public searchTable!: Array<string>  

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
    this.stocks = stocks.map((stock: Array<number | string | boolean>) => {
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


  @Action
  public async searchContents (code: string): Promise<any> {
    try {
      this.context.commit('updateLoading', true)
      
      const res = await axios.get(`/findByCode/${code}/30`, HEADER)

      this.context.commit('updateLoading', false)
    
      const result = Object.values(res.data).map((value: any) => Object.values(value)[3])
      result.pop()
            
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
