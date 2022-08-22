import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import axios from "axios";
import { IMarketRank , IStockModel, ISimpleChartData, IStockEvaluationModel } from "@/models/stock";
import { IUpdateStateModel } from "@/models/payload";

import { convertChartData } from "@/mixins/tools";

const URL = '/api'
const HEADER = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
}

@Module({namespaced: true})
export default class StockStore extends VuexModule {

  // 오늘의 간단 랭킹
  public dailySimpleRanksLoaded = false
  public dailySimpleRanks: IMarketRank = {
    marcap: [],
    change_incr: [],
    change_redu: [],
    volume: []
  }

  // 개별 종목 간단정보
  public stockLoaded = false
  public stock: IStockModel = {
    date : '',
    code: '',
    name: '',
    market: '',
    close: 0,
    changes: 0,
    changes_ratio: 0,
    open: 0,
    high: 0,
    low: 0,
    amount: 0,
    marcap: 0,
    stocks: 0,    
  }
  // 주가 그래프 인덱스 저장
  public stockGraphLength = 20


  // 종목 하나의 2주 그래프정보
  public stockGraphDefaultLoaded = false
  public stockGraphDefault = {}


  // 종목 하나의 5년치 그래프정보
  public stockGraphAll = {}
  public stockGraphAllLoaded = false

  // 종목 하나의 분기 적정주가
  public stockEvaluation = {}
  public stockEvaluationLoaded = false

  // 종목 하나의 일간 적정주가
  public stockEvaluationDaily: IStockEvaluationModel = {
    value: [],
    date: []
  }
  public stockEvaluationDailyLoaded = false
  get stockEvaluationDailyLast (): string {
    return this.stockEvaluationDaily?.value.slice(-1)[0]
  }

  // 거래량
  public stockGraphVolume = {}
  public stockGraphVolumeLoaded = false  
  public stockGraphAllFlag = false
  public stockGraphVolumeFlag = false


  // 종목 하나의 재무제표
  public statementLoaded = false
  public statement: ISimpleChartData = {}
  public statementTypes: string[] = []


  // 종목 하나의 5년치 재무제표
  public statementAllLoaded = false
  public statementAll: ISimpleChartData = {}  

  
  // 종목 하나의 4분기 보조지표
  public indicatorLoaded = false
  public indicator: ISimpleChartData = {}
  public indicatorTypes: string[] = []


  // 뉴스
  public newsLoaded = false
  public news: any[] = []


  // Mutations
  // state를 초기화합니다.
  @Mutation
  public updateState(payload: IUpdateStateModel) {    
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }
  
  // Actions
  // 비동기 로직을 실행합니다.

  // 오늘의 간단 랭킹을 불러옵니다.
  @Action
  public async getDailySimpleRanks(): Promise<void> {    
    try {
      this.context.commit('updateState', {
        dailySimpleRanksLoaded: true
      })

      const res = await axios.get(`/daily/rank`, HEADER)
            
      this.context.commit('updateState', {
        dailySimpleRanks: res.data,
        dailySimpleRanksLoaded: false
      })      
    } catch(e) {
      console.log(e)
    }
  }  

  // 하나의 간단 종목 정보를 가져옵니다.
  @Action
  public async getStock(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        stockLoaded: true
      })

      const res = await axios.get(`/stock/${name}`, HEADER)

      this.context.commit('updateState', {
        stock: res.data,
        stockLoaded: false
      })
    } catch(e) {
      console.log(e)
    }
  }

  // 종목 하나의 2주동안의 주가 정보를 가져옵니다.
  @Action
  public async getStockGraphDefault(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        stockGraphDefaultLoaded: true
      })

      const res = await axios.get(`/stock/${name}/price`, HEADER)      

      this.context.commit('updateState', {
        stockGraphDefault: res.data.origin,
        stockGraphDefaultLoaded: false
      })
    } catch(e) {
      console.log(e)
    }
  }


  // 종목 하나의 5년동안의 종가 정보를 가져옵니다.
  @Action
  public async getStockGraphAll(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        stockGraphAllLoaded: true
      })

      const res = await axios.get(`/stock/${name}/years-price`, HEADER)
      
      this.context.commit('updateState', {
        stockGraphAll: res.data.origin,
        stockGraphAllLoaded: false,
        stockGraphAllFlag: true
      })
    } catch(e) {
      console.log(e)
    }
  }


  // 종목 하나의 적정주가 정보들을 가져옵니다.
  @Action
  public async getStockEvaluation(stockCode: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        stockEvaluationLoaded: true
      })
      
      const res = await axios.get(`/stock/${stockCode}/evaluation`, HEADER)
      
      this.context.commit('updateState', {
        stockEvaluation: res.data,        
        stockEvaluationLoaded: false
      })      
      

      console.log(this.stockEvaluation)


    } catch (e) {
      console.log(e)
    }
  }

  @Action
  public async getStockEvaluationDaily(stockCode: string): Promise<void> {
    try {

      this.context.commit('updateState', {
        stockEvaluationDailyLoaded: true
      })

      const res = await axios.get(`/stock/${stockCode}/evaluation/daily`, HEADER)
      console.log(res.data)

      this.context.commit('updateState', {
        stockEvaluationDaily: res.data,
        stockEvaluationDailyLoaded: false
      })

    } catch (e) {
      console.log(e)
    }
  }
  

  // 

  // 종목 하나의 5년동안의 거래량 정보를 가져옵니다.
  @Action
  public async getStockGraphVolume(name: string): Promise<void> {
    try {      
      const res = await axios.get(`/stock/${name}/years-volume`, HEADER)
      
      this.context.commit('updateState', {
        stockGraphVolume: res.data.origin,
        stockGraphVolumeLoaded: false,
        stockGraphVolumeFlag: true
      })
    } catch(e) {
      console.log(e)
    }
  }

  // 종목 하나의 최근 4분기 보조지표를 가져옵니다.
  @Action
  public async getStockIndicator(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        indicatorLoaded: true,        
      })

      const res = await axios.get(`/stock/${name}/indicator`, HEADER)

      const label = Object.keys(res.data).slice(0, 4)      
      const value = Object.values(res.data).slice(0, 4) as string[]  
      const keys = Object.keys(value[0][0]).slice(1)

      this.context.commit('updateState', {
        indicatorTypes: keys,
        indicator: convertChartData(keys, value, label),
        indicatorLoaded: false,        
      })

    } catch(e) {
      console.log(e)
    }
  }
  
   // 종목 하나의 특정 재무제표 5년치 를 가져옵니다.
  @Action
  public async getStockStatementAll(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        statementAllLoaded: true
      })

      const res = await axios.get(`/stock/${name}/statement/revenue`, HEADER)

      this.context.commit('updateState', {
        statementAll: res.data.origin,
        statementAllLoaded: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  // 종목 하나의 모든항목 재무제표 4분기를 가져옵니다.
  @Action
  public async getStockStatement(code: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        statementLoaded: true
      })

      const res = await axios.get(`/stock/${code}/statement`, HEADER)

      const label = Object.keys(res.data)
      const value = Object.values(res.data) as string[]                        
      const keys = Object.keys(value[0][0])

      this.context.commit('updateState', {
        statementTypes: keys.filter((key: string) => key !== 'type'),
        statement: convertChartData(keys, value, label),
        statementLoaded: false
      })
    } catch(e) {
      console.log(e)
    }
  }  

  // 종목 하나의 관련 뉴스를 가져옵니다.
  @Action
  public async getStockNews(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        newsLoaded: true
      })

      const res = await axios.get(`/stock/${name}/news`)

      console.log(res.data)
      
      this.context.commit('updateState', {
        news: res.data,
        newsLoaded: false,
      })
    } catch (e) {
      console.log(e)
    }
  }  
}