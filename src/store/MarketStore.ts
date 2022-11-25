import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'

import { IUpdateStateModel } from '@/models/payload'
import { division } from '@/mixins/tools'
import { IMarketRecentValueModel } from '@/models/market'
import { StockSimpleModel, IMarketChartModel, IMarketRecentModel, StockRecommendModel } from '@/models/stock'
import { StoreState } from '@/store'

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
	public marketChart!: IMarketChartModel  
	public marketRecents!: IMarketRecentModel
	public requestDate = 20
	public stockRequestDate = 20
	public marketValuation!: IMarketRecentValueModel[]
	public marketValuationLoaded = false


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
	
	// 오늘의 주식 시장 정보들을불러옵니다.
	@Action
	public async getTodayMarket(): Promise<void> {
		try {
			this.context.commit('updateState', {
				marketLoaded: true
			})
			const res = await axios.get(`${API}/daily/trend`, HEADER)
			
			const marketDefault: {
				[marketType: string]: {
					labels: string[],
					values: Market[]
				}
			} = {
				kospi: { labels: [], values: [] },
				nasdaq: { labels: [], values: [] },
				snp500: { labels: [], values: [] },
				us1yt: { labels: [], values: [] },
				us5yt: { labels: [], values: [] },
				us10yt: { labels: [], values: [] },
				usdkrw: { labels: [], values: [] }
			}
			

			const marketChart = Object.entries(res.data).reduce((acc, entry: [string, any]) => {
					const types = ((entry[1] as (string | number)[]).map(v => Object.keys(v)[0]))          
					const index = entry[1].map((s: { [s: string]: unknown } | ArrayLike<unknown>) => Object.entries(s)[0])
					types.forEach(type => {
						const mappingType = marketMapping[type]				
						acc[mappingType].labels.push(entry[0])
						acc[mappingType].values.push(index.find(entry => entry[0] === type)[1])
					})
					return acc          
			}, marketDefault)

			const marketRecents = Object.values(marketMapping).reduce((acc, cur) => {
				acc[cur] = {
					close: marketChart[cur].values[marketChart[cur].values.length - 1].close,
					changes: marketChart[cur].values[marketChart[cur].values.length - 1].changes,
					recent: ''
				}
				return acc
			}, {})
			
			this.context.commit('updateState', {
				marketChart,
				marketRecents,
				marketLoaded: false
			})
		} catch (e) {    
			console.log(e)
		}
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
}
