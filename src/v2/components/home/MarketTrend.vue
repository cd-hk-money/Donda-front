<template>
  <div v-if="!marketLoaded">
    <v-card
      :width="mobile ? 460 : '94%'"
      color="#252424"
      class="ml-5 mr-5 mb-5 mt-5"
      rounded="xl"
      elevation="0"       
    >      
      <div class="d-flex">
        <div>
          <v-card-title class="d-flex align-center">
            <div class="market-title text-h5 font-weight-bold">
              <img src="@/assets/koreaflag.png" alt="ss" class="flag mr-3" /> KOSPI        
              <v-icon color="red" small class="ml-3">fa-solid fa-arrow-trend-up</v-icon>         
            </div>
            <div class="mt-1">
              <span class="text-h5">
                {{ computedKospi.close }} 
              </span>
              <span :class="['market-changes', computedKospi.color]">
                {{ computedKospi.changeValue }}
                ({{ computedKospi.changes}} %)
              </span>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div>
              <v-chip class="mt-2" color="red darken-3" v-if="!marketValuationLoaded">
                {{ marketValuation.KOSPI }}.                    
              </v-chip>
            </div>
            <div>
              <v-chip class="mt-2" v-if="!marketValuationLoaded">
                한국 주가는 상승중입니다.
              </v-chip>
            </div>
          </v-card-subtitle>
        </div>

        <div class="d-flex align-center justify-center">
          <v-card 
            elevation="0"
            min-height="100" min-width="200" class="d-flex align-center justify-center"
            color="#252424"
            @click="expandKospi = !expandKospi"
          > 
            <v-sparkline            
              color="cyan"
              :line-width="4"            
              :value="computedKospi.sparkLineDatas"
              auto-draw
              :smooth="16"
            />                    
          </v-card>
        </div>
      </div>

      <v-expand-transition>        
        <v-sheet color="#252424" height="300" width="100%" v-if="expandKospi">
          <v-divider class="ml-5 mr-5"/>            
            <v-chip-group 
              class="chart-chip-group"
              active-class="cyan--text text--accent-4"
              mandatory
              v-model="selectionChipGroup"
            >
              <v-chip small>2주</v-chip>
              <v-chip small>1달</v-chip>
              <v-chip small>분기</v-chip>            
            </v-chip-group>            
            
          <MarketChart          
            class="mt-5"
            :height="180"
            type="kospi"
            :fill="false"
            :count="selectionChipGroup"
          />
          
        </v-sheet>
      </v-expand-transition>
      

      
  
      
  
    </v-card>
    <v-card
      height="162"
      :width="mobile ? 460 : '94%'"
      color="#252424"
      class="ml-5 mr-5 mb-5"
      rounded="xl"
      elevation="0"
      @click="''"    
    >
  
  

  
    </v-card>
    <v-card
      height="162"
      :width="mobile ? 460 : '94%'"
      color="#252424"
      class="ml-5 mr-5 mb-5"
      rounded="xl"
      elevation="0"
      @click="''"    
    >
  
  

  
    </v-card>
    <v-card
      height="162"
      :width="mobile ? 460 : '94%'"
      color="#252424"
      class="ml-5 mr-5 mb-5"
      rounded="xl"
      elevation="0"
      @click="''"    
    >
  
  
 
  
    </v-card>
  </div>
</template>

<script lang="ts">
import {  IMarketChartModel, IMarketRecentModel } from '@/models/market'
import { MarketModel } from '@/models/market'
import { computed } from '@vue/reactivity'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import MarketChart from '@/v2/components/home/MarketChart.vue'

const MarketStoreModule = namespace('MarketStore')

@Component({
  components: {
    MarketChart
  }
})
export default class MarketTrend extends Vue {
  

  @MarketStoreModule.State('marketRecents') marketRecents!: IMarketRecentModel
  @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean
  @MarketStoreModule.State('marketValuation') marketValuation!: any
  @MarketStoreModule.State('marketValuationLoaded') marketValuationLoaded!: boolean
  @MarketStoreModule.State('marketChart') marketChart!: IMarketChartModel

  @MarketStoreModule.Action('getMarketValuation') getMarketValuation!: () => Promise<void>
  @MarketStoreModule.Action('getTodayMarket') getTodayMarket!: () => Promise<void>

  count = [14, 30, 120]
  expandKospi = false
  selectionChipGroup = 0

  @Watch('selectionChipGroup')
  watchSelctionChipGroup(old) {
    console.log(old)
  }
  

  get mobile () { return this.$vuetify.breakpoint.name === 'xs'}    

  get computedKospi() {
    const {changes, close} = this.marketRecents.kospi
    const {changeValue, color} = this.getChangeValue(changes, close)    
    const closes = this.marketChart.kospi.values.slice(-12, ).map((value: MarketModel) => value.close)
    
    return {
      ...this.marketRecents.kospi,
      changeValue,
      color,
      sparkLineDatas: closes
    }
  }

  getChangeValue(changes: number, close: number) {
    const changeValue = (changes * close)
    return {
      changeValue: (changeValue > 0 ? '+' : '-') + changeValue.toFixed(2),
      color: changeValue > 0 ? 'red--text' : 'blue--text'
    }
  }

  async mounted () {
    if(!this.marketValuation) await this.getMarketValuation()
    if(!this.marketRecents) await this.getTodayMarket()

    console.log(this.marketRecents)
    console.log(this.marketChart.kospi.values.slice(-12, ))        
    
  }

}
</script>

<style scoped>
.market-title {
  width: 150px;
  display: flex;
  align-items: center;
}

.market-changes {
  font-size: 14px;
}
.flag {
  height: 18px;
}

.chart-chip-group {
  position: absolute;
  display: flex;
  right: 12px;
  margin-top: 12px;
  gap: 3px;
}

.chart-chip-group-active {
  color: #00BCD4;
}
</style>