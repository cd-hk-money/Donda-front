import { StockSimpleModel } from './stock'

export interface InterestGroupsModel {
  userName: String
  interestList: InterestGroupModel[]
}

export interface InterestGroupModel {
  title: string,
  icon: string,
  listItem: InterestModel[]
}

export interface InterestModel {
  notification: Boolean
  stock: StockSimpleModel
}

// export interface SimpleStockModel {
//   title: String   // 종목 이름
//   code: String    // 종목 코드
//   stock: Number   // 종가
// }