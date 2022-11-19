import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUserAccount } from "@/models/user";
import { IInterestGroup } from "@/models/interest"
import InterestStore from './InterestStore'
import { IUpdateStateModel } from "@/models/payload";

import axios, { AxiosRequestConfig } from 'axios'

const HEADER: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }  
}
export interface User {
  username?: string | null
  email?: string | null
}

export type StoreState = {
  data: any
  error: any
  loading: boolean
}

@Module({namespaced: true})
export default class UserStore extends VuexModule {

  public accessToken = ''
  public refreshToken = ''
  public user = null

  public signUpState: StoreState = {
    data: '' as any,
    error: null as any,
    loading: false as boolean
  }

  public loginState: StoreState = {
    data: '' as any,
    error: null as any,
    loading: false as boolean
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
      const res = await axios.post('/web-service/auth/signUp', payload)

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

    console.log(payload)

    try {
      const res = await axios.post('/web-service/auth/login', payload)
      
      
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
      
      localStorage.accessToken = token.accessToken      
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