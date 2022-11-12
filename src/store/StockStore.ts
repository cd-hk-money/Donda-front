import { AsyncPayload } from '../api/stocks';
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import axios from "axios";
import { IMarketRank , IStockModel, ISimpleChartData, IStockEvaluationModel, IStockIndicatorSectorModel, IStockIndicatorDailyModel, INewsModel } from "@/models/stock";
import { IUpdateStateModel } from "@/models/payload";

import { convertChartData } from "@/mixins/tools";



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
    date: '',
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

  // 추천 종목
  public recommendStocks: IStockModel[] = []
  public recommendStocksLoaded = false  


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


  // 거래량
  public stockGraphVolume = {}
  public stockGraphVolumeLoaded = false    
  public stockGraphVolumeFlag = false


  // 종목 하나의 재무제표
  public statementLoaded = false
  public statement: ISimpleChartData = {}
  

  // 종목 하나의 5년치 재무제표
  public statementAllLoaded = false
  public statementAll: ISimpleChartData = {}  

  
  // 종목 하나의 4분기 보조지표
  public indicatorLoaded = false
  public indicatorDailyLoaded = false
  public indicator: ISimpleChartData = {}
  public indicatorDaily: IStockIndicatorDailyModel
  public indicatorDailyChartLabel: string[]
  public indicatorTypes: string[] = []

  // 종목 하나의 관련섹터 보조지표
  public indicatorSectorLoaded = false
  public indicatorSector: IStockIndicatorSectorModel
  public indicatorSectorDaily!: IStockIndicatorDailyModel


  // 유사종목
  public similarContents: IStockModel[] = []
  public similarContentsLoaded = false


  // 뉴스
  public newsLoaded = false
  public news: INewsModel[] = []


  // Mutations  
  @Mutation
  public updateState(payload: IUpdateStateModel) {    
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }

  @Mutation
  public loading(state: string) {    
    this[state + 'Loaded'] = true        
  }

  @Mutation
  public success({ state, data }: {state: string, data: unknown}) {
    this[state + 'Loaded'] = false
    this[state] = data 
  }

  @Mutation
  public error(state: string) {
    this[state + 'Loaded'] = false
  }
  
  // Actions
  // 비동기 로직을 실행합니다.
  @Action
  public async getAPI(payload: AsyncPayload): Promise<void> {
    
    const { state, asyncCallback, compute } = payload
    
    this.context.commit('loading', state)    
    try {
      const res = await asyncCallback()      
      const data = compute(res)

      this.context.commit('success', { state: state, data })

    } catch (e) {
      this.context.commit('error', state)
    }
  }

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


  


  
  // 종목 하나의 5년동안의 거래량 정보를 가져옵니다.
  @Action
  public async getStockGraphVolume(name: string): Promise<void> {
    try {      

      this.context.commit('updateState', {
        stockGraphVolumeLoaded: true
      })
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

  @Action
  public async getStockIndicatorDaily(stockcode: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        indicatorDailyLoaded: true
      })

      const res = await axios.get(`/stock/${stockcode}/indicator/daily`)

      const indicatorDailyChartLabel = Object.keys(res.data).slice(0, -9)      
      const indicatorDaily = 
        Object
        .values(res.data)
        .slice(0, -9)
        .map(arr => arr[0])
        .reduce((acc, cur) => {
            acc.PBR.push(cur.PBR)
            acc.PER.push(cur.PBR)
            acc.PSR.push(cur.PBR)
            return acc
        },{
          PBR: [], PER: [], PSR: []
        })      
      
      this.context.commit('updateState', {
        indicatorDailyLoaded: false,
        indicatorDailyChartLabel,
        indicatorDaily
      })
      
    } catch (e: unknown) {
      console.log(e)
    }
  }


  /**
   * @param code 종목 정보
   * @description 종복 하나의 관련 섹터 보조 지표를 가져옵니다.
   */
  @Action
  public async getIndicatorSector(code: string): Promise<void> {
    try {      
      this.context.commit('updateState', {
        indicatorSectorLoaded: true
      })

      const multiRes = await axios
                .all([axios.get(`/stock/${code}/sector`), axios.get(`/stock/${code}/sector/daily`)])                
                                            
      const [indicatorSector, indicatorSectorDaily] = multiRes.map(v=> v.data)      
      
      const computedIndicatorSectorDaily = 
        Object.values(indicatorSectorDaily)
        .map(arr => arr[0])
        .reduce((acc, cur, _) => {
            acc.PBR.push(cur.pbr)
            acc.PER.push(cur.per)
            acc.PSR.push(cur.psr)
            return acc
        },{
          PBR: [], PER: [], PSR: []
        })     

      this.context.commit('updateState', {
        indicatorSector,
        indicatorSectorDaily: computedIndicatorSectorDaily,
        indicatorSectorLoaded: false
      })
      
    } catch (e) {
      console.log(e)
    }
  }
  


  // 현재 종목에 대해 유사 종목을 가져옵니다.
  @Action
  public async getSimilarContents(code: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        similarContentsLoaded: true
      })

      const res = await axios.get(`/stock/${code}/similar`)     
      
            
      this.context.commit('updateState', {
        similarContentsLoaded: false,
        similarContents: res.data
      })

    } catch (e) {
      console.log(e)
    }
  }
 
}