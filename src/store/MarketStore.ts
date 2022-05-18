import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'

import { StockSimpleModel, StockRecommendModel} from '@/models/stock'
import { MarketModel, IMarketChartModel, IMarketRecentModel } from '@/models/market'
import { IUpdateStateModel } from '@/models/payload'
import { division } from '@/mixins/tools'


const HEADER = {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    }
  }

const URL = ''

@Module({namespaced: true})
export default class MarketStore extends VuexModule {

  // 자동 완성을 위한 모든 종목의 종목명과 코드
  public searchTableLoaded = false  
  public searchTable!: StockSimpleModel[]

  // 주식 시장
  public marketLoaded = false  
  public marketChart!: IMarketChartModel  
  public marketRecents!: Array<IMarketRecentModel>
  public requestDate = 20

  // 종목 추천 정보
  public recommendLoaded = false
  public recommend: StockRecommendModel[] = []
  get recommendArray () {
    return division(this.recommend, 2)
  }
  

  @Mutation updateRequestDate(payload: number) {    
    if(payload < 2) {

      if(payload * this.requestDate < 3) return      
      this.requestDate = Math.floor(this.requestDate * payload)
    } 
    else {
      this.requestDate = payload
    }  
  }

  @Mutation
  public updateState(payload: IUpdateStateModel) {    
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }
  
  // 오늘의 주식 시장 정보들을불러옵니다.
  @Action
  public async getTodayMarket(): Promise<void> {
    try {
      this.context.commit('updateState', {
        marketLoaded: true
      })
      const res = await axios.get('/daily/trend', HEADER)

      console.log(res.data)

      const labels = Object.keys(res.data)
      const marketChartData: IMarketChartModel = {
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
        us1yt: {
          labels: [],
          data: []
        },
        us5yt: {
          labels: [],
          data: []
        },
        us10yt: {
          labels: [],
          data: []
        },
        usdkrw: {
          labels: [],
          data: []
        },
      }

      Object.values(res.data).forEach((m, index) => {
        const f = m as Array<MarketModel>   
        const kospi = f.find((market: MarketModel) => market.type === 'KOSPI')
        const nasdaq = f.find((market: MarketModel) => market.type === 'NASDAQ')
        const snp500 = f.find((market: MarketModel) => market.type === 'S&P500')
        const us1yt = f.find((market: MarketModel) => market.type === 'US1YT')
        const us5yt = f.find((market: MarketModel) => market.type === 'US5YT')
        const us10yt = f.find((market: MarketModel) => market.type === 'US10YT')
        const usdkrw = f.find((market: MarketModel) => market.type === 'USD/KRW')

        console.log(
          f.map((market: MarketModel) => Object.keys(market)).find((type: any) => {
             
          })
        )

        if(kospi) {
          marketChartData.kospi.labels.push(labels[index])
          marketChartData.kospi.data.push(kospi)        
        }      
  
        if(nasdaq) {
          marketChartData.nasdaq.labels.push(labels[index])
          marketChartData.nasdaq.data.push(nasdaq)
        }
  
        if(snp500) {
          marketChartData.snp500.labels.push(labels[index])
          marketChartData.snp500.data.push(snp500)
        }
        if(us1yt) {
          marketChartData.us1yt.labels.push(labels[index])
          marketChartData.us1yt.data.push(snp500)
        }
        if(us5yt) {
          marketChartData.us5yt.labels.push(labels[index])
          marketChartData.us5yt.data.push(snp500)
        }
        if(us10yt) {
          marketChartData.us10yt.labels.push(labels[index])
          marketChartData.us10yt.data.push(snp500)
        }
        if(usdkrw) {
          marketChartData.usdkrw.labels.push(labels[index])
          marketChartData.usdkrw.data.push(snp500)
        }  
      })

      // const marketRecentsData = [
      //   {
      //     market: 'KOSPI',
      //     close: marketChartData.kospi.data.slice(-1)[0].close,
      //     changes: marketChartData.kospi.data.slice(-1)[0].changes,
      //     recent: marketChartData.kospi.labels[marketChartData.kospi.labels.length - 1],
      //   },
      //   {
      //     market: 'NASDAQ',
      //     close: marketChartData.nasdaq.data.slice(-1)[0].close,
      //     changes: marketChartData.nasdaq.data.slice(-1)[0].changes,
      //     recent: marketChartData.nasdaq.labels[marketChartData.nasdaq.labels.length -1]
      //   },
      //   {
      //     market: 'S&P500',
      //     close: marketChartData.snp500.data.slice(-1)[0].close,
      //     changes: marketChartData.snp500.data.slice(-1)[0].changes,
      //     recent: marketChartData.snp500.labels[marketChartData.snp500.labels.length - 1]
      //   },
      //   {
      //     market: 'US1YT',
      //     close: marketChartData.us1yt.data.slice(-1)[0].close,
      //     changes: marketChartData.us1yt.data.slice(-1)[0].changes,
      //     recent: marketChartData.us1yt.labels[marketChartData.us1yt.labels.length - 1]
      //   },
      //   {
      //     market: 'US5YT',
      //     close: marketChartData.us5yt.data.slice(-1)[0].close,
      //     changes: marketChartData.us5yt.data.slice(-1)[0].changes,
      //     recent: marketChartData.us5yt.labels[marketChartData.us5yt.labels.length - 1]
      //   },
      //   {
      //     market: 'US10YT',
      //     close: marketChartData.us10yt.data.slice(-1)[0].close,
      //     changes: marketChartData.us10yt.data.slice(-1)[0].changes,
      //     recent: marketChartData.us10yt.labels[marketChartData.us10yt.labels.length - 1]
      //   },
      //   {
      //     market: 'USD/KRW',
      //     close: marketChartData.usdkrw.data.slice(-1)[0].close,
      //     changes: marketChartData.usdkrw.data.slice(-1)[0].changes,
      //     recent: marketChartData.usdkrw.labels[marketChartData.usdkrw.labels.length - 1]
      //   }
        
      // ]
      console.log('store', marketChartData)
      this.context.commit('updateState', {
        marketChart: marketChartData,
        // marketRecents: marketRecentsData,
        marketLoaded: false
      })
    } catch (e) {    
      console.log(e)
    }
  }  
  

  // 자동완성을 위한 기업명과 코드를 불러옵니다.
  @Action
  public async getSearchTable(): Promise<void> {
    try {
      this.context.commit('updateState', {
        searchTableLoaded: true
      })
      const res = await axios.get('/krx-corps', HEADER)

      this.context.commit('updateState', {
        searchTable: Object.entries(res.data).map((stock: any) => ({
          code: stock[0],
          title: stock[1]
        })),
        searchTableLoaded: false
      })      
    } catch (e) {
      console.log(e)
    }
  }

  // 추천 종목을 불러옵니다.
  @Action
  public async getRecommend(): Promise<void> {
    try {
      this.context.commit('updateState', {
        recommendLoaded : true
      })
      const res = await axios.get(`daily/recommand`)
      
      this.context.commit('updateState', {
        recommend: Object.entries(res.data).map((recommend: any[]) => ({
          code: recommend[0],
          ...recommend[1]
        })),
        recommendLoaded : false,
      })      

    } catch (e) {
      console.log(e)
    }
  }
}
