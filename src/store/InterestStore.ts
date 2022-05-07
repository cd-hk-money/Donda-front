import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { IInterestGroupItem, IInterestGroup } from "@/models/interest";

@Module({namespaced: true})
export default class InterestStore extends VuexModule {
  public interestGroups: IInterestGroup[] = [
    {
      title: '관심종목 그룹1',
      item: []
    },
    {
      title: '관심종목 그룹2',
      item: []
    },
    {
      title: '관심종목 그룹3',
      item: []
    },
    {
      title: '관심종목 그룹4',
      item: []
    },
    {
      title: '관심종목 그룹5',
      item: []
    },
    {
      title: '관심종목 그룹6',
      item: []
    },
  ]

  @Mutation
  public addInterestGroup(group: IInterestGroup) {
    if(group.title !== '')
      this.interestGroups.push(group)
  }

  @Mutation
  public removeInterestGroup(title: string) {
    try {
      this.interestGroups.filter((group: IInterestGroup) => {
        group.title !== title
      })
    } catch (e) {
      console.log('그룹 삭제 실패')
      throw e
    }
  }

  @Mutation
  public editInterestGroup(title: string) {
    try {
      this.interestGroups.find((group: IInterestGroup) => {
        group.title = title
      })
    } catch (e) {
      console.log('이름 변경 실패')
      throw e
    }
  }

  @Mutation 
  public addInterestGroupItem(payload: {title: string, item: IInterestGroupItem}) {    
    try {
      const findContent = this.interestGroups.find(group => group.title === payload.title)
      findContent.item.push(payload.item)
    } catch (e) {
      console.log('아이템 추가 실패')
      throw e
    }
  }

  @Mutation
  public removeInterstGroupItem(groupTitle: string, itemTitle: string) {
    try {
      this.interestGroups.find(group => {
        group.title === groupTitle
      }).item.filter(item => {
        item.title !== itemTitle
      })
    } catch (e) {
      console.log('아이템 삭제 실패')
      throw e
    }
  }

  @Mutation
  public initInterestGroup() {    
    let k = 0
    this.interestGroups.forEach((group: IInterestGroup) => {
      for(let i = 0; i<3; i++) {
        group.item.push({
          title: `종목 이름${++k}`,
          code: '000000'
        })       
      }
    })

    console.log(this.interestGroups)
  }
}





















