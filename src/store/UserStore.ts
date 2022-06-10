import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUserAccount } from "@/models/user";
import { IInterestGroup } from "@/models/interest"
import InterestStore from './InterestStore'
import axios from 'axios'

@Module({namespaced: true})
export default class UserStore extends VuexModule {

  @Action
  public async tryLogin(payload: IUserAccount): Promise<void> {
    
    try {
      const res = await axios.post('/api', payload)  
      const userBookmarked = [...new Set(res.data.map((interest: IInterestGroup) => interest.item).flat())]
      InterestStore.state.bookmarked = userBookmarked            
    } catch (e) {
      console.log(e)
    }

  }
}