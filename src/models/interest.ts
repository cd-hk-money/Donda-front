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

type AlramType = 'close' | 'volume'
type FavoType = 'favo' | 'unfa'

interface IUserAlram {
  title: string,        // 종목명
  type: AlramType,      // 알림 타입
  contents?: string,     // 알림 내용
  value?: number | string         // 변동값

}

export {
  IInterestGroup,
  IInterestGroupItem,
  IUserInterestGroupItem,
  IUserAlram
}
