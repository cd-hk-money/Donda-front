import { AsyncPayload } from '@/store/payload';
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { IUpdateStateModel } from "@/models/payload";
import { initialState } from './utils';
import * as stockTypes from '@/models/stock'

@Module({namespaced: true})
export default class StockStore extends VuexModule {

  // 개별 종목 간단정보
  public stockLoaded = false

  public stock = initialState<stockTypes.StockType>()
  public stockGraphVolume = initialState<stockTypes.VolumeType>()
  public stockGraphDefault = initialState<stockTypes.GraphDefaultType>()
  public stockGraphAll = initialState<stockTypes.GraphAllType>()
  public stockEvaluation = initialState<stockTypes.EvaluationType>()
  public stockEvaluationDaily = initialState<stockTypes.EvaluationDailyType>()
  public similarContents = initialState<stockTypes.SimilarType>()
  public news = initialState<stockTypes.NewsType>()
  public statement = initialState<stockTypes.StatementType>()
  public statementAll = initialState<stockTypes.StatementAllType>()
  public indicator = initialState<stockTypes.IndicatorType>()
  public indicatorSector = initialState<stockTypes.IndicatorSectorType>()
  public indicatorDaily = initialState<stockTypes.IndicatorDailyType>()
  public indicatorSectorDaily = initialState<stockTypes.IndicatorSectorDailyType>()
  public stockDonda = initialState<stockTypes.DondaType>()
  public recommendStocks = initialState<stockTypes.StocksType>()
  public recommendStockCodes = initialState()

  asset = initialState()
  equity = initialState()
  equityNon = initialState()
  liability = initialState()
  currentAsset = initialState()
  profit = initialState()
  profitNon = initialState()
  revenue = initialState()
  cash = initialState()
  ebitda = initialState()
  grossMargin = initialState()

  // Mutations  
  @Mutation
  public updateState(payload: IUpdateStateModel) {    
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }

	@Mutation
  public loading(state: string) {    
    this[state].loading = true        
  }

  @Mutation
  public success({ state, data }: {state: string, data: unknown}) {
    this[state].data = data 
    this[state].loading = false
  }

  @Mutation
  public error({ state, error }: {state: string, error: unknown}) {
		this[state].error = error
    this[state].loading = false
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

    } catch (error) {
      this.context.commit('error', {state, error})
    }
  }
}