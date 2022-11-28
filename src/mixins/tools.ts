import colorLib, { Color } from '@kurkle/color';
import { ISimpleChartData } from '@/models/stock';

// 가격을 정규화 합니다.
export function priceNormalization(price: number | string): string {
  return typeof price === 'number' ? 
    price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") :
    price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

// 모바일 여부를 판별합니다.
export function isMobile(): boolean | any {    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
}

/**
 * 
 * @param value 색상
 * @param opacity 투명도 
 * @returns 투명도가 적용된 그라데이션 색상
 */
export function transparentize(value: string | number[] | Color, opacity?: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}


/**
 * 
 * @param keys 
 * @param value 
 * @param label 
 * @returns 
 */
export function convertChartData(keys: string[], value: any[], label: string[]): ISimpleChartData {
  return keys.reduce((acc: any, cur: string, index: number) => {        
    acc[keys[index]] = {
      date: label,
      value: value.map((s) => s[0][cur])
    }
    return acc
  },{})
}

export function meanStockData(arg: number[]): number {
  if(arg.length === 0 ) return
  return arg.reduce((acc, cur, index) => acc + cur) / arg.length ?? 0
}

export function maxStockData(arg: number[] | number): number {
  if(typeof arg === 'number') return 
  if(arg.length === 0 ) return
  return arg.reduce((acc, cur, index) => acc < cur ? cur : acc ) ?? 0
}

export function minStockData(arg: number[] | number): number {
  if(typeof arg === 'number') return 
  if(arg.length === 0 ) return
  return arg.reduce((acc, cur, index) => acc > cur ? cur : acc )
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

export function division(arr: any[], n: number): any[any] {
  const length = arr.length
  const divide = Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0)
  const newArray = []

  for (let i = 0; i < divide; i++) {
    newArray.push(arr.splice(0, n))
  }

  return newArray
}


export function getGradient (ctx, chartArea, data, scales, width, height) {
  const {left, right, top, bottom} = chartArea
  const x = scales['x-axis-0']
  const y = scales['y-axis-0']

  // data.labels.indexOf()
  const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom)   
  const shift = y.getPixelForValue(
    meanStockData(
      data.datasets[0].data.slice(20)
    )
  ) / bottom  
  
  gradientBorder.addColorStop(0, 'rgba(28, 24, 222, 1)')
  gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)')
  gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)')
  gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)')
  
  return gradientBorder
}

export function belowGradient (ctx, chartArea, data, scales) {
  const {left, right, top, bottom} = chartArea
  const x = scales['x-axis-0']
  const y = scales['y-axis-0']
  const gradientBackground = ctx.createLinearGradient(
    0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom) 

  gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)')
  gradientBackground.addColorStop(1, 'rgba(255, 26, 104, 0.4)')
  return gradientBackground
}

export function aboveGradient (ctx, chartArea, data, scales) {
  const {left, right, top, bottom} = chartArea
  const x = scales['x-axis-0']
  const y = scales['y-axis-0']
  const gradientBackground = ctx.createLinearGradient(
    0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom) 

  gradientBackground.addColorStop(0, 'rgba(75, 192, 192, 0.2)')
  gradientBackground.addColorStop(1, 'rgba(75, 192, 192, 0.5)')
  return gradientBackground
}


export function crosshairLine(chart, mousemove) {  
  const { ctx, canvas, chartArea: {left, right, top, bottom}} = chart;

  const coorX = mousemove.offsetX
  const coorY = mousemove.offsetY  

  // chart.update('none')
  ctx.restore()

  if(coorX > left && coorX <= right && coorY >= top && coorY <= bottom) {
    canvas.style.cursor = 'crosshair'
  } else {
    canvas.style.cursor = 'default'
  }

  // crosshairLabel(chart, mousemove)

  // 대시바 설정
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 3
  ctx.setLineDash([3, 3])

  ctx.beginPath();
  ctx.moveTo(left, coorY);
  ctx.lineTo(right, coorY);
  // ctx.closePath(); 

  ctx.moveTo(coorX, top);
  ctx.lineTo(coorX, coorY);
  ctx.stroke();   

}

function crosshairLabel(chart, mousemove) {
  const { ctx, canvas, scales, chartArea: {left, right, top, bottom}} = chart;
  const x = scales['x-axis-0']
  const y = scales['y-axis-0']

  const coorX = mousemove.offsetX
  const coorY = mousemove.offsetY  

  ctx.beginPath()
  ctx.fillStyle = 'rgba(132, 132, 132, 1)'
  ctx.fillRect(0, coorY - 10, left, 20)
  ctx.closePath()

  ctx.font = '12px sans-serif'
  ctx.fillStype = 'white'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(y.getValueForPixel(coorY).toFixed(1), left / 2, coorY)

  ctx.beginPath()
  ctx.fillStyle = 'rgba(132, 132, 132, 1)'
}

export const myCrossHair = {
  id: 'mycrosshair',
  afterInit: function(chart) {
    chart.crosshair = {
      enabled: false,
      x: null,
      y: null,
      originalData: [],
      originalXRange: {},
      dragStarted: false,
      dragStartX: null,
      dragEndX: null,  
    }
  },
  getXScale: function(chart) {
    return chart.data.datasets.length ? chart.scales[chart.getDatasetMeta(0).xAxisID] : null;
  },
  getYScale: function(chart) {
    return chart.scales[chart.getDatasetMeta(0).yAxisID];
  },
  afterEvent: function(chart, e) {        
    chart.crosshair.x = e.x
    chart.crosshair.y = e.y
    chart.draw();
  },
  drawTraceLine: (chart) => {
    const {ctx, data, chartArea: {top, bottom, left, right}, scales, width} = chart      
    const x = scales['x-axis-0']
    const y = scales['y-axis-0']
    const lineX = chart.crosshair.x
    const lineY = chart.crosshair.y
    const yScale = myCrossHair.getYScale(chart);
    const textWidth = ctx.measureText('0000-00-00').width + 10
    
    ctx.beginPath()          
    ctx.lineWidth = 2
    ctx.strokeStyle = '#a1a1a3'

    ctx.moveTo(lineX, yScale.getPixelForValue(yScale.max))
    ctx.lineTo(lineX, yScale.getPixelForValue(yScale.min))

    ctx.stroke()
    ctx.closePath()      

    crosshairPoint(chart, chart.crosshair)
  },
  afterDraw: function(chart, e) {      
    if(e.y > chart.chartArea.bottom || e.y < chart.chartArea.top || e.x < chart.chartArea.left || e.x > chart.chartArea.right) {
      return true
    }
    else {
      this.drawTraceLine(chart);
    }
  }
}



function crosshairPoint(chart, mousemove) {
  const {ctx, data, scales, width} = chart     

  const x = scales['x-axis-0']
  const y = scales['x-axis-0']

  const coorX = mousemove.x

  ctx.beginPath()
  ctx.fillStyle = 'rgba(255, 26, 104, 1)'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 1
  ctx.setLineDash([6, 0])

  const angle = Math.PI / 180
  const segments = x._gridLineItems?.length - 1

  for(let i = 0; i < segments; i++) {
    if(coorX >= x._gridLineItems[i].tx1 && coorX <= x._gridLineItems[i + 1].tx1) {
      let y1Start = y.getPixelForValue(data.datasets[0].data[i])
      let y1End = y.getPixelForValue(data.datasets[0].data[i + 1])

      let y2Start = y.getPixelForValue(data.datasets[1].data[i])
      let y2End = y.getPixelForValue(data.datasets[1].data[i + 1])

      if(x._gridLineItems.length !== data.datasets[0].data.length) {
        y1Start = y.getPixelForValue(data.datasets[0].data[i * 2])
        y1End = y.getPixelForValue(data.datasets[0].data[i * 2 + 2])
        y2Start = y.getPixelForValue(data.datasets[1].data[i * 2])
        y2End = y.getPixelForValue(data.datasets[1].data[i * 2 + 2])
      }

      ctx.beginPath()
      ctx.fillStyle = '#5383e8'
      ctx.arc(
        coorX, 
        y1Start + ((y1End - y1Start) / (width / segments) * (coorX - x._gridLineItems[i].tx1)), 
        5, angle * 0, angle * 360, false
      )
      ctx.fill()
      ctx.stroke()
      ctx.closePath()

      ctx.beginPath()
      ctx.fillStyle = '#e84057'
      ctx.arc(
        coorX, 
        y2Start + ((y2End - y2Start) / (width / segments) * (coorX - x._gridLineItems[i].tx1)), 
        5, angle * 0, angle * 360, false
      )
      ctx.fill() 
      ctx.stroke()
      ctx.closePath()
    }
  }

  ctx.closePath()

}

export function numToKorean(number: number) {
  if(number >= 1000000000000) return number / 1000000000000 + '조'
  else if(number > 100000000) return number / 100000000 + '억'
  else if(number < -1000000000000) return '-' + number * (-1) / 1000000000000 + '조'
  else if(number < -100000000) return '-' + number * (-1) / 100000000 + '억'
  else number
}

export function getFirstUpper(str: string) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}