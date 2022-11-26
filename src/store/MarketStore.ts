import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IUpdateStateModel } from '@/models/payload'
import { DailySimpleRankType, MarketType, MarketValuationType, SearchTableType } from '@/models/market'
import { StoreState } from '@/store'
import { AsyncPayload } from './payload'


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

	
	// 주식 시장
	public market: StoreState = initialState<MarketType>()
	public marketValuation: StoreState = initialState<MarketValuationType>()
	public searchTable: StoreState = initialState<SearchTableType>()
	public dailySimpleRanks: StoreState = initialState<DailySimpleRankType>()
	public requestDate = 20
	

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


	@Mutation 
	public updateRequestDate(payload: number) {    
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
