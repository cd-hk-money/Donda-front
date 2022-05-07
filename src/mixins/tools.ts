import colorLib, { Color } from '@kurkle/color';
import { ISimpleChartData } from '@/models/stock';

// 가격을 정규화 합니다.
export function priceNormalization(price: number | string): string {
  return typeof price === 'number' ? 
    price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") :
    price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

// 모바일 여부를 판별하빈다.
export function isMobile(): boolean | any {    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
}

// 색상의 투명도를 조절합니다.
export function transparentize(value: string | number[] | Color, opacity?: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export function convertChartData(keys: string[], value: string[], label: string[]): ISimpleChartData {
  return keys.reduce((acc: any, cur: string, index: number) => {        
    acc[keys[index]] = {
      date: label,
      value: value.map((s) => s[0][cur])
    }
    return acc
  },{})
}

export function mobileHeight(type: string): number {
  switch (type) {
    case 'xs': return 220
    case 'sm': return 400
    case 'md': return 500
    case 'lg': return 600
    case 'xl': return 800    
  }
  return 800  
}