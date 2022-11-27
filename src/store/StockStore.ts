import { AsyncPayload } from '@/store/payload';
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { IStockModel, ISimpleChartData, IStockEvaluationModel, IStockIndicatorSectorModel, IStockIndicatorDailyModel, INewsModel } from "@/models/stock";
import { IUpdateStateModel } from "@/models/payload";
import { initialState } from './utils';
import * as stockTypes from '@/models/stock'

@Module({namespaced: true})
export default class StockStore extends VuexModule {

  // 개별 종목 간단정보
  public stockLoaded = false

  public stock = initialState<stockTypes.StockType>()
  // public stockGraphVolume = initialState<stockTypes.VolumeType>()
  // public stockGraphDefault = initialState<stockTypes.GraphDefaultType>()
  // public stockGraphAll = initialState<stockTypes.GraphAllType>()
  // public stockEvaluation = initialState<stockTypes.EvaluationType>()
  // public stockEvaluationDaily = initialState<stockTypes.EvaluationDailyType>()
  // public similarContents = initialState<stockTypes.SimilarType>()
  // public news = initialState<stockTypes.NewsType>()
  // public statement = initialState<stockTypes.StatementType>()
  // public statementAll = initialState<stockTypes.StatementAllType>()
  // public indicator = initialState<stockTypes.IndicatorType>()
  // public indicatorSector = initialState<stockTypes.IndicatorSectorType>()
  // public indicatorDaily = initialState<stockTypes.IndicatorDailyType>()
  // public stockDonda = initialState<stockTypes.DondaType>()
  // public recommendStocks = initialState<stockTypes.StocksType>()


  

  // 추천 종목  
  public recommendStocks: IStockModel[] = []
  public recommendStocksLoaded = false  

  public recommendStockCodes: string[] = []
  public recommendStockCodesLoaded = false


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


  // 종목 하나의 관련섹터 보조지표
  public indicatorSectorLoaded = false
  public indicatorSector: IStockIndicatorSectorModel
  public indiacotrSetorDailyLoaded = false
  public indicatorSectorDaily!: IStockIndicatorDailyModel

  public stockDonda = null
  public stockDondaLoaded = false


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
  public async callRequest(payload: AsyncPayload): Promise<void> {
    
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
}