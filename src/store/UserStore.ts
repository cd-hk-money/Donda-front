import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUserAccount } from "@/models/user";
import axios from 'axios'


@Module({namespaced: true})
export default class UserStore extends VuexModule {

  @Action
  public async tryLogin(payload: IUserAccount): Promise<void> {
    
    try {
      const res = await axios.post('/api', payload)  
      console.log(res)          
    } catch (e) {
      console.log(e)
    }

  }
}