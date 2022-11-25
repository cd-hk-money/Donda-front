import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUpdateStateModel } from "@/models/payload";
import { StoreState } from '@/store'
import axios from 'axios'


/*
  api-gateway 사용시 /web-service
  단독 사용시 /
*/
const API = '/web-service'

export interface User {
  username?: string | null
  email?: string | null
}

@Module({namespaced: true})
export default class UserStore extends VuexModule {

  public accessToken = ''
  public refreshToken = ''
  public user = null

  public signUpState: StoreState = {
    data: '',
    error: null,
    loading: false
  }

  public loginState: StoreState = {
    data: '',
    error: null,
    loading: false
  }

  @Mutation
  error({state, error}: {state: string, error: any}) {    
    this[state].error = error
    this[state].loading = false
    console.log('error', state, error)
  }

  @Mutation
  loading(state: string) {    
    console.log('loading ', state)
    this[state].loading = true
  }

  @Mutation
  success({state, data}: {state: string, data: any}) {
    console.log('success ', state, data)
    this[state].data = data
    this[state].loading = false
  }

  @Mutation
  updateState(payload: IUpdateStateModel) {
    Object.entries(payload).forEach(entry => {
      this[entry[0]] = entry[1]
    })
  }
    
  @Action
  public async trySignUp(payload: {
    username: string,
    nickname: string,
    email: string,
    password: string
  }): Promise<void> {

    this.context.commit('loading', 'signUpState')

    try {          
      const res = await axios.post(`${API}/auth/signUp`, payload)

      this.context.commit('success', { state: 'signUpState', data: res.data })
    } catch (e) {      
      this.context.commit('error', { state: 'signUpState', error: e })
    }
  }

  @Action
  public async tryLogin(payload: {
    username: string,
    password: string
  }): Promise<void> {

    this.context.commit('loading', 'loginState')

    try {

      const res = await axios.post(`${API}/auth/login`, payload)
      
      
      this.context.commit('success', { state: 'loginState', data: res.data })    

      const token = {
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken
      }

      const user = {
        username: payload.username,
        email: ''
      }

      this.context.commit('updateState', {
        ...token,
        user: {
          username: payload.username,
          email: ''
        }
      })
      
      localStorage.setItem('accessToken', token.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
            
    } catch (e) {
      this.context.commit('error', { state: 'loginState', error: e })
    }
  }

  @Action
  public tryLogout() {
    this.context.commit('updateState', {
      accessToken: null,
      refreshToken: null,
      user: null
    })

    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  }  
}