import { StockSimpleModel } from './stock'

export interface InterestGroupsModel {  
  interestList: InterestGroupModel[],
}

export interface InterestGroupModel {
  title: string,
  icon: string,
  groupItem: InterestModel[]
}

export interface InterestModel {
  notification: boolean
  stock: StockSimpleModel
}


interface IInterestGroup {
  title: string
  item: IInterestGroupItem[]
}

interface IInterestGroupItem {
  title: string
  code: string
}

export {
  IInterestGroup,
  IInterestGroupItem
}
