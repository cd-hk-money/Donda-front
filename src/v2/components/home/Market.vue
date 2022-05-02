<template>
  <v-card        
    class="mt-5 ml-5 mr-5"
    height="465"
    rounded="xl"
  >
    <v-carousel 
      v-if="!marketLoaded"                     
      height="auto"
      cycle
      hide-delimiter-background
      show-arrows-on-hover    
      hide-delimiters  
      interval="200000"
    >            
      <v-carousel-item                
        v-for="(marketRecent, i) in marketRecents"
        :key="i"        
      >          
        <v-card                    
          height="auto"                                    
        >                        
          <market-desc 
            @fillChange="onFill"
            @changeRequestDate="changeRequestDate"            
            :desc="marketRecent" />                   
          <market-chart   
            :fill="fill"
            class="ml-5 mr-5"
            :color="colors[i]"
            :height="100"
            :count="count"            
            :type="marketRecent.market" />
        </v-card>
      </v-carousel-item>              
    </v-carousel>       
  </v-card>        
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// components
import MarketCarousel from '@/components/market/MarketCarousel.vue'
import MarketDesc from '@/v2/components/home/MarketDesc.vue'
import MarketChart from '@/v2/components/home/MarketChart.vue'
import CircularLoading from '@/layout/CircularLoading.vue'


// models
import { IMarketRecentModel } from '@/models/market'



const StockStoreModule = namespace('StockStore')
const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    MarketCarousel,
    MarketDesc,
    MarketChart,
    CircularLoading
  }
})
export default class Market extends Vue {
  
  @MarketStoreModule.State('marketRecents')
  private marketRecents!: IMarketRecentModel[] 

  @MarketStoreModule.State('marketLoaded')
  private marketLoaded!: boolean
    
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  // kospi, nasdaq, snp500의 차트 색상
  private colors = ['#40E0D0', '#40E0D0', '#40E0D0']  

  // 그래프의 채움 
  private fill: boolean | string = 'start'

  // 초기 라벨 개수
  private count = 20

  private changeRequestDate (date: number) {    
    this.count = this.count + date
  }


  private getChartOptions (type: string) {
    return {
      legend: {
        display: false,
        labels: {          
          fontColor: 'grey',
          fontStyle: 'bold',
          fontSize: 14
        },
        onclick: function() {return }
      },
      tooltip: {
        usePointStyle: true,
        enabled: false,
        mode: 'x',
        position: 'cursor'
      },
      datalabels: {
        color: 'red'
      },
      scales: {              
        xAxes: [{
          title: {
            color: '#fff'
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{            
          ticks: {
            callback: function(value: string) {return value.toLocaleString()},                        
            display: true,
          },
          min: 2600,          
          gridLines: {
            display: false
          },          
        }],          
      },
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2000,       
        easing: 'easeOutBounce'         
      },    
      plugins: {
        zoom: {
          zoom: {
            enabled: true
          },
          pinch: {
            enabeld: true
          },
          mode: 'x'
        }
      }      
    }
  }

  public onFill (payload: boolean | string) {
    console.log(payload)
    this.fill = payload
  }
}
</script>