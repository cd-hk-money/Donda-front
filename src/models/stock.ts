
//
export interface StockSimpleModel {
 title: string
 code: string
 stock: number 
}


//
export interface StockDetailModel {
  title: string               // 기업명
  renewalDate: Date           // 최근 갱신일   
  closePrice: string          // 최근 종가
  closePriceAmount: string    // 최근 종가 변화량
  closePriceRatio: string     // 최근 종가 변화율
  closeVolume: string         // 최근 거래량
  closeVolumeAmount: string   // 최근 거래량 변화량
  closeVolumeRatio: string    // 최근 거래량 변화율    
  stockAmount: string         // 발행주식수
  marcap: string              // 시가총액
  higiestYears: string        // 52주 최고
  lowestYears: string         // 52주 최저  
}

// 임시. 
export interface StockRankModel {
  title: string
  code: string
  close: number
  change: number
  changeRatio: string
}

//
export interface StockPriceModel {
  Change: number
  Close: number
  High: number
  Low: number
  Open: number
  Volume: number
}

//
export interface LineChartModel {
  date: string
  value: number
}

//
export interface StockListModel {
  title: string
  close: string
  marcap: string
  tran: string
  charge: string
}