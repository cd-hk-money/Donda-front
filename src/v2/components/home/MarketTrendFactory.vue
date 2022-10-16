<template>
  <v-card
    :width="mobile ? '465' : '94%'"
    color="#252424"    
    class="ml-5 mr-5 mb-5 mt-5"
    min-height="162"
    rounded="xl"
    elevation="0"     
  >
    <div class="d-flex flex-warp align-center justify-start">
      <div class="">
        <v-card-title class="d-flex align-center">
          <div class="market-title text-h5 font-weight-bold">
            <img v-if="contry === 'korea'" src="@/assets/koreaflag.png" alt="ss" class="flag mr-3" /> 
            <img v-else src="@/assets/usaflag.png" alt="ss" class="flag mr-3" />             
            {{ title }}       
            <v-icon :color="market.trendIconColor" small class="ml-2">{{ market.trendIcon }}</v-icon>         
          </div>
          <div class="mt-1">
            <span class="text-h5">
              {{ market.close }} 
            </span>
            <span :class="['market-changes', market.color]">
              {{ market.changeValue }}
              ({{ market.changes.toFixed(3)}} %)
            </span>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <v-chip class="mt-1" :color="chipColor">
              {{ marketValuation }}.                    
            </v-chip>
          </div>
          <div>
            <v-chip class="mt-1">
              {{ chipContnet.contry }} 시장은
              <span :class="['mr-1 ml-1 font-weight-bold', chipContnet.textColor]">{{ chipContnet.trend }}</span> 중입니다.
            </v-chip>
          </div>
        </v-card-subtitle>
      </div>

      <v-card       
        elevation="0"
        min-height="100"        
        :min-width="mobile ? '110' : '180'"
        class="d-flex align-center justify-center mr-3 mt-3 sparkline-sheet"
        color="#252424"
        @click="expand = !expand"
      > 
        <v-sparkline            
          :min-width="mobile ? '110' : '180'"
          color="cyan"
          :line-width="4"            
          :value="market.sparkLineDatas"
          auto-draw
          :smooth="16"          
        />                    
      </v-card>
    </div>

    <v-expand-transition>        
      <v-sheet color="#252424" :height="mobile ? '230' : '300'" width="100%" v-if="expand">
        <v-divider class="ml-5 mr-5"/>            
          <v-chip-group 
            class="chart-chip-group"
            active-class="cyan--text text--accent-4"
            mandatory
            v-model="selectionChipGroup"
          >
            <v-chip small>2주</v-chip>
            <v-chip small>1달</v-chip>
            <v-chip small>1분기</v-chip>            
          </v-chip-group>            
          
        <MarketChart          
          class="mt-5"
          :height="130"
          :type="market.type"
          :fill="false"
          :count="selectionChipGroup"
        />
        
      </v-sheet>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';  
  import { ComputedMarket } from '@/v2/components/home/MarketTrend.vue';
  import MarketChart from '@/v2/components/home/MarketChart.vue'
  

  @Component({
    components: {
      MarketChart
    }
  })
  export default class MarketTrendFactory extends Vue {

    @Prop() market!: ComputedMarket
    @Prop() marketValuation!: string
    @Prop() contry!: string


    expand = false
    selectionChipGroup = 0


    get title() {
      return this.marketValuation.split('은')[0].split('는')[0]
    }

    get flag () {
      return this.contry === 'korea' ? '@/assets/koreaflag.png' : '@/assets/usaflag.png'
    }
    
    get mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    }

    get chipColor () {
      return this.marketValuation.includes('상승') ? 'red darken-3' : 'primary'
    }

    get chipContnet () {      
      return {
        contry: this.contry === 'korea' ? '한국' : '미국',
        trend: this.marketValuation.includes('상승') ? '상승' : '하락',
        textColor: this.marketValuation.includes('상승') ? 'red--text' : 'blue--text'
      }
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

.sparkline-sheet {
  position: absolute;
  right: 5px;
  top: 33px;
}

.chart-chip-group-active {
  color: #00BCD4;
}
</style>