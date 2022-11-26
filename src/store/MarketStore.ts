import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'

import { IUpdateStateModel } from '@/models/payload'
import { division } from '@/mixins/tools'
import { IMarketRecentValueModel } from '@/models/market'
import { StockSimpleModel, IMarketChartModel, IMarketRecentModel, StockRecommendModel } from '@/models/stock'
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

const initalState = {
	data: null,
	error: null,
	loading: false
}

interface Market {
	changes: number
	close: number
	high: number
	low: number
	open: number
	volume: number
}

@Module({namespaced: true})
export default class MarketStore extends VuexModule {

	// 자동 완성을 위한 모든 종목의 종목명과 코드
	public searchTableLoaded = false  
	public searchTable!: StockSimpleModel[]
	public codeTitleMapping: { [title: string]: string } = {}

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
	public marketLoaded = false  
	public market: StoreState = initalState
	public requestDate = 20
	public stockRequestDate = 20
	public marketValuation!: IMarketRecentValueModel[]
	public marketValuationLoaded = false

	public marketv2: StoreState = initalState


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


	// 시장 트렌드를 불러옵니다.
	@Action
	public async getMarketValuation(): Promise<void> {
		try {
			this.context.commit('updateState', {
				marketValuationLoaded: true
			})

			const res = await axios.get(`${API}/daily/market`, HEADER)

			this.context.commit('updateState', {
				marketValuationLoaded: false,
				marketValuation: res.data
			})
		} catch(e)	 {
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
			const res = await axios.get(`${API}/krx-corps`, HEADER)
			
			this.context.commit('updateState', {
				searchTable: Object.entries(res.data).map((stock: any) => ({
					code: stock[0],
					title: stock[1]
				})),
				codeTitleMapping: Object.keys(res.data).reduce((acc, k) => {
					const v = res.data[k]
					acc[v] = [...(acc[res.data] || []), k]
					return acc
				}, {}),
				searchTableLoaded: false
			})      
		} catch (e) {
			console.log(e)
		}
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
						
    } catch (error) {
      this.context.commit('error', { state, error })
    }
  }
}
