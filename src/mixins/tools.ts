import colorLib, { Color } from '@kurkle/color';

export function priceNormalization(price: number | string): string {
  return typeof price === 'number' ? 
    price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") :
    price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

export function isMobile(): boolean | any {    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
}

export function transparentize(value: string | number[] | Color, opacity?: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}