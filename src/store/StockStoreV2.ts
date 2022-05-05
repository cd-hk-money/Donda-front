import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import axios from "axios";
import { IMarketRank , IStockModel, IStockStatementModel } from "@/models/stock";
import { IUpdateStateModel } from "@/models/payload";

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
    stocks: 0
  }

  // 종목 하나의 2주 그래프정보
  public stockGraphDefaultLoaded = false
  public stockGraphDefault = {}

  // 종목 하나의 재무제표
  public statementLoaded = false
  public statement: IStockStatementModel = {}
  
  @Mutation
  public updateState(payload: IUpdateStateModel) {    
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }

  // 오늘의 간단 랭킹을 불러옵니다.
  @Action
  public async getDailySimpleRanks(): Promise<void> {    
    try {
      this.context.commit('updateState', {
        dailySimpleRanksLoaded: true
      })

      const res = await axios.get(`${URL}/daily/rank`, HEADER)
            
      console.log(res.data)
      this.context.commit('updateState', {
        dailySimpleRanks: res.data,
        dailySimpleRanksLoaded: false
      })      

    } catch(e) {
      console.log(e)
    }
  }  

  // 하나의 종목 정보를 가져옵니다.
  @Action
  public async getStock(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        stockLoaded: true
      })

      const res = await axios.get(`${URL}/stock/${name}`, HEADER)
      this.context.commit('updateState', {
        stock: res.data,
        stockLoaded: false
      })

    } catch(e) {
      console.log(e)
    }
  }

  // 종목 하나의 제무재표를 가져옵니다.
  @Action
  public async getStockStatement(name: string): Promise<void> {
    try {
      this.context.commit('updateState', {
        statementLoaded: true
      })

      const res = await axios(`${URL}/stock/statement/${name}`, HEADER)

      this.context.commit('updateState', {
        statement: res.data,
        statementLoaded: false
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
        stockGraphDefaultLoaded: true,        
      })

      const res = await axios(`${URL}/stock/graph/${name}`, HEADER)
      console.log(res.data)
      this.context.commit('updateState', {
        stockGraphDefault: res.data,
        stockGraphDefaultLoaded: false
      })

    } catch(e) {
      console.log(e)
    }
  }
  
}