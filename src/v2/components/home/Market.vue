<template>    
  <v-card          
    height="450"
    :width="isMobile ? 460 : '94%'"    
    :class="['ml-5', isMobile ? '' : '']"
    elevation="0"             
  >
    <v-card-title class="font-weight-bold">
      주식 시장      
    </v-card-title>
    <v-card-subtitle>
      주식 시장 주가를 알아보세요.
    </v-card-subtitle>

    <v-divider></v-divider>
    
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
            class="mt-5"
            :mobile="false"
            :fill="fill"                        
            :height="180"
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

import MarketDesc from '@/v2/components/home/MarketDesc.vue'
import MarketChart from '@/v2/components/home/MarketChart.vue'

import { IMarketRecentModel } from '@/models/market'

import StoreMixin from '@/mixins/StoreMixin.vue'

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
      color: '#00BCD4',
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

  get isMobile () { return this.$vuetify.breakpoint.name === 'xs'}

  onFill (payload: boolean | string) {
    this.fill = payload
  }
}
</script>