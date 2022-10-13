<template>
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
            <v-chip class="mt-2" color="red darken-3">
              {{ marketValuation }}.                    
            </v-chip>
          </div>
          <div>
            <v-chip class="mt-2">
              <slot></slot>                
            </v-chip>
          </div>
        </v-card-subtitle>
      </div>

      <div class="d-flex align-center justify-center">
        <v-card 
          elevation="0"
          min-height="100" min-width="200" class="d-flex align-center justify-center"
          color="#252424"
          @click="expand = !expand"
        > 
          <v-sparkline            
            color="cyan"
            :line-width="4"            
            :value="market.sparkLineDatas"
            auto-draw
            :smooth="16"
          />                    
        </v-card>
      </div>
    </div>

    <v-expand-transition>        
      <v-sheet color="#252424" height="300" width="100%" v-if="expand">
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