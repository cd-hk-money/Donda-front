import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { DailySimpleRankType, MarketType, MarketValuationType, SearchTableType } from '@/models/market'
import { initialState } from './utils' 
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

@Module({namespaced: true})
export default class MarketStore extends VuexModule {

	
	// 주식 시장
	public market = initialState<MarketType>()
	public marketValuation = initialState<MarketValuationType>()
	public searchTable = initialState<SearchTableType>()
	public dailySimpleRanks = initialState<DailySimpleRankType>()
	public requestDate = 20
	
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
