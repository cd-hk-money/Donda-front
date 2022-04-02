import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { StockSimpleModel } from '@/models/stock'

const HEADER = {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }

@Module({namespaced: true})
export default class InterestStore extends VuexModule {

  // state
  public chartLoading: boolean = false
  public markets!: StockSimpleModel

  @Mutation
  public updateTitle(payload: string): void {

  }

  @Mutation
  public updateMarket(payload: any): void {
    this.markets = payload
  }

  @Mutation
  public updateLoading(payload: boolean): void {
      this.chartLoading = payload
  }


  @Action
  public async initInterestGroups(token: string): Promise<void> {
    try {
        this.context.commit('updateLoading', false)        
        const res = await axios.get(`/today`, HEADER)
        this.context.commit('updateMarket', res.data.data)
        this.context.commit('updateLoading', true)
        
    } catch (e) {
        console.log(e)
    }
  }

  
}
