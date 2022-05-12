import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { IInterestGroupItem, IInterestGroup } from "@/models/interest";

@Module({namespaced: true})
export default class InterestStore extends VuexModule {
  public snackBar = false
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
    {
      title: '관심종목 그룹7',
      item: []
    },
  ]

  @Mutation
  public snackBarClose() {
    this.snackBar = this.snackBar = false
  }

  @Mutation
  public snackBarOpen() {
    this.snackBar = this.snackBar = true
  }

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
  public removeInterstGroupItem(itemTitle: string) {    
    this.interestGroups.forEach((group: IInterestGroup) => {
      group.item.filter((item: IInterestGroupItem) => item.title !== itemTitle)
    })
  }

  @Mutation
  public initInterestGroup() {    
    // 사용자의 관심종목을 불러옴..
  }
}





















