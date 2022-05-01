import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { StockSimpleModel} from '@/models/stock'
import { MarketModel, IMarketChartModel, IMarketRecentModel } from '@/models/market'
import * as _ from 'lodash'
import { Getter } from 'vuex-class'

const HEADER = {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }


@Module({namespaced: true})
export default class MarketStore extends VuexModule {

  // 자동 완성을 위한 모든 종목의 종목명과 코드
  public searchTableLoaded = false  
  public searchTable!: Array<StockSimpleModel>

  // 주식 시장
  public marketLoaded = false
  
  // 주식 시장 차트
  public marketChart!: IMarketChartModel

  // 주식 시장 최근
  public marketRecents!: Array<IMarketRecentModel>

  public requestDate = 20

  @Mutation updateRequestDate(payload: number) {    
    if(payload * this.requestDate < 3) return
  
    this.requestDate = Math.floor(this.requestDate * payload)
  
  }

  @Mutation
  public updateMarketLoaded(payload: boolean) {
    this.marketLoaded = payload
  }

  @Mutation
  public updateSearchTableLoaded(payload: boolean) {
    this.searchTableLoaded = payload
  }

  @Mutation
  public updateMarket(payload: any) {        
  
    const label: IMarketChartModel = {
      kospi: {
        labels: [],
        data: []
      },
      nasdaq: {
        labels: [],
        data: []
      },
      snp500: {
        labels: [],
        data: []
      },
    }
    const labels = Object.keys(payload)

    Object.values(payload).forEach((m, index) => {
      const f = m as Array<MarketModel>
      
      const kospi = f.find((market: MarketModel) => market.type === 'KOSPI')
      const nasdaq = f.find((market: MarketModel) => market.type === 'NASDAQ')
      const snp500 = f.find((market: MarketModel) => market.type === 'S&P500')

      if(kospi) {
        label.kospi.labels.push(labels[index])
        label.kospi.data.push(kospi)        
      }      

      if(nasdaq) {
        label.nasdaq.labels.push(labels[index])
        label.nasdaq.data.push(nasdaq)
      }

      if(snp500) {
        label.snp500.labels.push(labels[index])
        label.snp500.data.push(snp500)
      }

    })

    this.marketChart = label        

    this.marketRecents = [
      {
        market: 'KOSPI',
        close: label.kospi.data.slice(-1)[0].close,
        changes: label.kospi.data.slice(-1)[0].changes,
        recent: label.kospi.labels[label.kospi.labels.length - 1],
      },
      {
        market: 'NASDAQ',
        close: label.nasdaq.data.slice(-1)[0].close,
        changes: label.nasdaq.data.slice(-1)[0].changes,
        recent: label.nasdaq.labels[label.nasdaq.labels.length -1]
      },
      {
        market: 'S&P500',
        close: label.snp500.data.slice(-1)[0].close,
        changes: label.snp500.data.slice(-1)[0].changes,
        recent: label.snp500.labels[label.snp500.labels.length - 1]
      }
    ]    
  }

  @Mutation
  public updateSearchTable(payload: any) {
    this.searchTable = payload
  }
  
  @Action
  public async getTodayMarket(): Promise<void> {
    try {
      this.context.commit('updateMarketLoaded', true)      
      const res = await axios.get('/api/daily/total', HEADER)

      this.context.commit('updateMarket', res.data)
      this.context.commit('updateMarketLoaded', false)
    } catch (e: any) {    
      console.log(e)
    }
  }  
  
  @Action
  public async getSearchTable(): Promise<void> {
    try {
      this.context.commit('updateSearchTableLoaded', true)
      const res = await axios.get('/api/allcorps', HEADER)

      const markets: Array<StockSimpleModel> = Object.entries(res.data).map((stock: any) => {
        return {  
          code: stock[0],
          title: stock[1]
        }
      })

      this.context.commit('updateSearchTable', markets)
      this.context.commit('updateSearchTableLoaded', false)
    } catch (e: any) {
      console.log(e)
    }
  }
}
