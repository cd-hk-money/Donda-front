import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'

import { IUpdateStateModel } from '@/models/payload'
import { division } from '@/mixins/tools'
import { IMarketRecentValueModel, MarketType, MarketValuationType, SearchTableType } from '@/models/market'
import { StockSimpleModel, StockRecommendModel } from '@/models/stock'
import { StoreState } from '@/store'
import { AsyncPayload } from './payload'

const HEADER = {
	headers: {
		'Content-Type': 'text/plain;charset=utf-8'
	}
}

const API = process.env.VUE_APP_STOCK_API

const marketMapping = {
	'KOSPI': 'kospi',
	'NASDAQ': 'nasdaq',
	'S&P500': 'snp500',
	'US1YT': 'us1yt',
	'US5YT': 'us5yt',
	'US10YT': 'us10yt',
	'USD/KRW': 'usdkrw'
}

const initialState = <T>(inital?: T) => ({
	data: inital,
	error: null,
	loading: false
})


@Module({namespaced: true})
export default class MarketStore extends VuexModule {

	// 자동 완성을 위한 모든 종목의 종목명과 코드

	public dailySimpleRank!: StoreState
	public stockRecommend!: StoreState
	

	
	// 오늘의 간단 랭킹
	public dailySimpleRanksLoaded = false
	public dailySimpleRanks = {
		marcap: [],
		change_incr: [],
		change_redu: [],
		volume: []
	}


	// 주식 시장
	public market: StoreState = initialState<MarketType>()
	public marketValuation: StoreState = initialState<MarketValuationType>()
	public searchTable: StoreState = initialState<SearchTableType>()

	public requestDate = 20
	public stockRequestDate = 20

	get marketRecents () {
		return Object.values(marketMapping).reduce((acc, cur) => {
			acc[cur] = {
				close: this.market.data[cur].values[this.market.data[cur].values.length - 1].close,
				changes: this.market.data[cur].values[this.market.data[cur].values.length - 1].changes,
				recent: ''
			}
			return acc
		}, {}) ?? {}
	}

	get codeTitleMapping (): { [title: string]: string } {
		return this.searchTable.data.reduce((acc: { [x: string]: string }, cur: { title: string | number; code: string }) => {
			acc[cur.title] = cur.code
			return acc
		}, {})
	}


	// 종목 추천 정보
	public recommendLoaded = false
	public recommend: StockRecommendModel[]
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

	@Mutation
  public loading(state: string) {    
    this[state].loading = true        
  }

  @Mutation
  public success({ state, data }: {state: string, data: unknown}) {
    this[state].loading = false
    this[state].data = data 
  }

  @Mutation
  public error({ state, error }: {state: string, error: unknown}) {
    this[state].loading = false
		this[state].error = error
  }
	

	// 추천 종목을 불러옵니다.
	@Action
	public async getRecommend(): Promise<any> {
		try {
			this.context.commit('updateState', {
				recommendLoaded : true
			})
			const res = await axios.get(`${API}/daily/recommand`)

			const recommend = Object.entries(res.data).map((recommend: any[]) => ({
				code: recommend[0],
				...recommend[1]
			}))
						
			this.context.commit('updateState', {
				recommend,
				recommendLoaded : false,
			})     
			
			return recommend
			
		} catch (e) {
			console.log(e)
		}
	}

	@Action
  public async getDailySimpleRanks(): Promise<void> {    
    try {
      this.context.commit('updateState', {
        dailySimpleRanksLoaded: true
      })

      const res = await axios.get(`${API}/daily/rank`, HEADER)
            
      this.context.commit('updateState', {
        dailySimpleRanks: res.data,
        dailySimpleRanksLoaded: false
      })      
    } catch(e) {
      console.log(e)
    }
  }  

  // 비동기 로직을 실행합니다.
  @Action
  public async callRequestMarket(payload: AsyncPayload): Promise<void> {
    
    const { state, asyncCallback, compute } = payload
    
    this.context.commit('loading', state)    
    try {
      const res = await asyncCallback()      
      const data = compute(res)

      this.context.commit('success', { state, data })
			console.log(this[state], state)
						
    } catch (error) {
      this.context.commit('error', { state, error })
    }

		
  }
}
