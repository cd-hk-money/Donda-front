import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import axios from 'axios'
import * as _ from 'lodash'

import { StockSimpleModel, StockRecommendModel} from '@/models/stock'
import { IMarketChartModel, IMarketRecentModel, IMarketRecentValueModel } from '@/models/market'
import { IUpdateStateModel } from '@/models/payload'
import { division } from '@/mixins/tools'


const HEADER = {
	headers: {
		'Content-Type': 'text/plain;charset=utf-8'
	}
}


@Module({namespaced: true})
export default class MarketStore extends VuexModule {

	// 자동 완성을 위한 모든 종목의 종목명과 코드
	public searchTableLoaded = false  
	public searchTable!: StockSimpleModel[]
	public codeTitleMapping: { [title: string]: string } = {}


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
			const res = await axios.get('/daily/trend', HEADER)

			const entries = Object.entries(res.data)

			const marketDefault = {
				kospi: {
					labels: [],
					values: []
				},
				nasdaq: {
					labels: [],
					values: []
				},
				snp500: {
					labels: [],
					values: []
				},
				us10yt: {
					labels: [],
					values: []
				},
				us1yt: {
					labels: [],
					values: []
				},
				us5yt: {
					labels: [],
					values: []
				},
				usdkrw: {
					labels: [],
					values: []
				}
			}
											
			const marketChart = entries.reduce((acc, entry: (string | any)[]) => {
					const types = ((entry[1] as any[]).map(v => Object.keys(v)[0]))          
					const index = entry[1].map(s => Object.entries(s)[0])

					if(types.find(v => v === 'KOSPI')) {
						acc.kospi.labels.push(entry[0])              
						acc.kospi.values.push(index.find(entry => entry[0] === 'KOSPI')[1])
					}  
					if(types.find(v => v === 'NASDAQ')) {
						acc.nasdaq.labels.push(entry[0])              
						acc.nasdaq.values.push(index.find(entry => entry[0] === 'NASDAQ')[1])
					}  
					if(types.find(v => v === 'S&P500')) {
						acc.snp500.labels.push(entry[0])              
						acc.snp500.values.push(index.find(entry => entry[0] === 'S&P500')[1])
					}  
					if(types.find(v => v === 'US10YT')) {
						acc.us10yt.labels.push(entry[0])              
						acc.us10yt.values.push(index.find(entry => entry[0] === 'US10YT')[1])
					}  
					if(types.find(v => v === 'US1YT')) {
						acc.us1yt.labels.push(entry[0])              
						acc.us1yt.values.push(index.find(entry => entry[0] === 'US1YT')[1])
					}  
					if(types.find(v => v === 'US5YT')) {
						acc.us5yt.labels.push(entry[0])              
						acc.us5yt.values.push(index.find(entry => entry[0] === 'US5YT')[1])
					}  
					if(types.find(v => v === 'USD/KRW')) {
						acc.usdkrw.labels.push(entry[0])              
						acc.usdkrw.values.push(index.find(entry => entry[0] === 'USD/KRW')[1])
					}  

					return acc          
			}, marketDefault)

			const marketRecents = {
				kospi: {
					close: marketChart.kospi.values[marketChart.kospi.values.length - 1].close,
					changes: marketChart.kospi.values[marketChart.kospi.values.length - 1].changes,  
					recent: '몰라;'    
				},
				nasdaq: {
					close: marketChart.nasdaq.values[marketChart.nasdaq.values.length - 1].close,
					changes: marketChart.nasdaq.values[marketChart.nasdaq.values.length - 1].changes,  
					recent: '몰라;'    
				},
				snp500: {
					close: marketChart.snp500.values[marketChart.snp500.values.length - 1].close,
					changes: marketChart.snp500.values[marketChart.snp500.values.length - 1].changes,  
					recent: '몰라;'    
				},
				us10yt: {
					close: marketChart.us10yt.values[marketChart.us10yt.values.length - 1].close,
					changes: marketChart.us10yt.values[marketChart.us10yt.values.length - 1].changes,  
					recent: '몰라;'    
				},
				us1yt: {
					close: marketChart.us1yt.values[marketChart.us1yt.values.length - 1].close,
					changes: marketChart.us1yt.values[marketChart.us1yt.values.length - 1].changes,  
					recent: '몰라;'    
				},
				us5yt: {
					close: marketChart.us5yt.values[marketChart.us5yt.values.length - 1].close,
					changes: marketChart.us5yt.values[marketChart.us5yt.values.length - 1].changes,  
					recent: '몰라;'    
				},
				usdkrw: {
					close: marketChart.usdkrw.values[marketChart.usdkrw.values.length - 1].close,
					changes: marketChart.usdkrw.values[marketChart.usdkrw.values.length - 1].changes,  
					recent: '몰라;'    
				}
			}
			
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

			const res = await axios.get('/daily/market', HEADER)
			console.log(res.data)

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
			const res = await axios.get('/krx-corps', HEADER)
			
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
			const res = await axios.get('/daily/recommand')
			
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
}
