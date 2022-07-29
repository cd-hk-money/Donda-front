<template>
  <v-card        
    :class="[mobile ? 'mt-15 ml-5 mr-5' : 'mt-5 ml-5 mr-5']"
    :height="mobile ? 480 : 475"    
    elevation="0"         
    outlined
  >
    <v-carousel        
      height="auto"
      cycle
      hide-delimiter-background
      show-arrows-on-hover    
      hide-delimiters  
      interval="200000"
      v-if="!marketLoaded"                     
    >                  
      <v-carousel-item                
        v-for="(marketType, i) in marketTypes"
        :key="i"                
      >          
      
        <v-card height="auto">
          <market-desc 
            @fillChange="onFill"
            @changeRequestDate="changeRequestDate"            
            :type="marketType" />                   
          <market-chart   
            :mobile="mobile"
            :fill="fill"            
            :class="[mobile ? 'mr-5' : 'ml-5 mr-5']"      
            :height="mobile ? 140 : 50"
            :count="count"            
            :type="marketType" />
        </v-card>
      </v-carousel-item>              
    </v-carousel>       
  </v-card>        
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// components
import MarketDesc from '@/v2/components/home/MarketDesc.vue'
import MarketChart from '@/v2/components/home/MarketChart.vue'


// models
import { IMarketRecentModel } from '@/models/market'
import { mobileHeight } from '@/mixins/tools'


const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    MarketDesc,
    MarketChart,
  }
})
export default class Market extends Vue {
  
  
  // 마켓 타입
  marketTypes = ['kospi', 'nasdaq', 'snp500', 'us10yt', 'us1yt', 'us5yt', 'usdkrw']

  // 그래프의 채움 
  fill: boolean | string = false

  // 초기 라벨 개수
  count = 20

  // 오버레이 유무
  overlay = false
  
  // V-SPARKLINE 데이터
  sparklines = [
    {
      value: [0, 26, 5, 0, 18],
      color: '#40E0D0',
      text: '한국'
    },
    {
      value: [0, 0, 26, 5, 18],
      color: '#40E0D9',
      text: '미국'
    },
  ]

  @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean    
  @MarketStoreModule.State('marketRecents') marketRecents!: IMarketRecentModel[] 

  changeRequestDate (date: number) {    
    this.count = this.count + date
  }

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  onFill (payload: boolean | string) {
    this.fill = payload
  }
}
</script>