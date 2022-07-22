import { StockSimpleModel, SingleStock } from './stock'

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

interface IInterestGroupItem extends SingleStock {
  id?: number
}

interface IUserInterestGroupItem extends SingleStock {  
  alarm: boolean
}

export {
  IInterestGroup,
  IInterestGroupItem,
  IUserInterestGroupItem
}
