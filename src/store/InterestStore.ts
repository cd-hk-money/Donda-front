import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { IInterestGroupItem, IInterestGroup, IUserInterestGroupItem  } from "@/models/interest";

@Module({namespaced: true})
export default class InterestStore extends VuexModule {
  public snackBar = false
  public bookmarked: string[] = []
  public snackMessage!: string
  public interestGroups: IInterestGroup[] = [
    {
      title: '관심종목 그룹1',
      item: []
    },
    {
      title: '관심종목 그룹2',
      item: []
    }
  ]

  public userInterests: IUserInterestGroupItem[] = []
  

  @Mutation
  public snackBarClose() {
    this.snackBar = this.snackBar = false
  }

  @Mutation
  public addGroup (group) {
    this.interestGroups.push(group)
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
      this.interestGroups = this.interestGroups.filter((group: IInterestGroup) => group.title !== title)
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
      this.userInterests = []
      this.interestGroups.find(group => group.title === payload.title).item.push(payload.item)
      this.bookmarked.push(payload.item.title)             
      this.interestGroups.forEach((interestGroup: IInterestGroup) => {
        interestGroup.item.forEach((item: IInterestGroupItem) =>  this.userInterests.push({
          ...item,
          alarm: false
        }))
      })

      this.userInterests = [...new Set(this.userInterests)]
      console.log(this.userInterests)

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
  public userInterestUpdate() {
    this.userInterests = []
    this.interestGroups.forEach((interestGroup: IInterestGroup) => {
      interestGroup.item.forEach((item: IInterestGroupItem) =>  this.userInterests.push({
        ...item,
        alarm: false
      }))
    })

    this.userInterests = [...new Set(this.userInterests)]
  }

  @Mutation
  public initInterestGroup() {    
    // 사용자의 관심종목을 불러옴..
  }

  @Mutation
  public changeUserInterestAlram(payload: number) {
    this.userInterests[payload].alarm = !this.userInterests[payload].alarm    
    this.snackBarOpen()

    // snackbar
  }
  
}





















