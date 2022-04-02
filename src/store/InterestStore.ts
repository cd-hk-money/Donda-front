import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { InterestGroupsModel, InterestGroupModel } from '@/models/interest'


@Module({namespaced: true})
export default class InterestStore extends VuexModule {

  // state
  public interestGroups!: Array<string>
  public interestGroup!: InterestGroupModel

  public loaded: boolean = false


  get getInterestGroups(): Array<string> {
    return this.interestGroups
  }

  get getInterestGroup(): InterestGroupModel {
    return this.interestGroup
  }

  @Mutation
  public initGroups(): void {
    this.loaded = false
    this.interestGroups = ['1', '2', '3', '4', '5']
    this.loaded = true
  }  
}
