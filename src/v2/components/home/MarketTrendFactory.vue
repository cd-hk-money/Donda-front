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
          <div class="market-title text-h6 font-weight-bold">
            <img v-if="contry === 'korea'" src="@/assets/koreaflag.png" alt="ss" class="flag mr-3" /> 
            <img v-else src="@/assets/usaflag.png" alt="ss" class="flag mr-3" />             
            {{ title === 'USD/KRW' ? '환율' :  title }}       
            <v-icon :color="market.trendIconColor" small class="ml-1">{{ market.trendIcon }}</v-icon>         
          </div>
          <div class="mt-1">
            <span class="text-h5">
              {{ market.close }} 
            </span>
            <span :class="['market-changes', market.color]">
              {{ market.changes }}
              ({{ per.toLocaleString() }}%)
            </span>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <v-carousel
              hide-delimiter-background             
              hide-delimiters
              vertical hide cycle
              :show-arrows="false"
              width="auto"
              height="45"
            >
              <v-carousel-item>
                <v-chip class="mt-1" :color="getChipColor('weeklyTrend2')">
                  {{ marketValuation.market }}은(는) 2주동안 {{ Math.abs(marketValuation.weeklyTrend2) }}% 
                  {{ (marketValuation.weeklyTrend2 > 0 ? '상승' : '하락') }} 하였습니다.                    
                </v-chip>
              </v-carousel-item>
              <v-carousel-item>
                <v-chip class="mt-1" :color="getChipColor('weeklyTrend')">
                  {{ marketValuation.market }}은(는) 1주동안 {{ Math.abs(marketValuation.weeklyTrend) }}% 
                  {{ marketValuation.weeklyTrend > 0 ? '상승' : '하락' }} 하였습니다.                    
                </v-chip>
              </v-carousel-item>
              <v-carousel-item>
                <v-chip class="mt-1" :color="getChipColor('monthlyTrend')">
                  {{ marketValuation.market }} 한달 동안 {{ Math.abs(marketValuation.monthlyTrend) }}% 
                  {{ marketValuation.monthlyTrend > 0 ? '상승' : '하락' }} 하였습니다.                    
                </v-chip>
              </v-carousel-item>

            </v-carousel>
            
          </div>
          <div>
            <v-chip class="mt-1">
              {{ title === 'USD/KRW' ? '환율' : `${chipContnet.contry}시장` }} 은
              <span :class="['mr-1 ml-1 font-weight-bold', chipContnet.textColor]">{{ chipContnet.trend }}</span> 중입니다.
            </v-chip>
          </div>
        </v-card-subtitle>
      </div>

      <v-card       
        elevation="0"
        min-height="100"        
        :min-width="mobile ? '105' : '180'"
        class="d-flex align-center justify-center mr-3 mt-3 sparkline-sheet"
        color="#252424"        
        @click="[expand = !expand, menu = false]"
      > 
        <v-sparkline            
          :min-width="mobile ? '105' : '180'"
          color="cyan"
          :line-width="4"            
          :value="market.sparkLineDatas"
          auto-draw
          :smooth="16"          
        />                    
      </v-card>
    </div>

    <v-expand-transition>        
      <v-sheet color="#252424" :height="mobile ? '230' : '250'" v-if="expand" :width="mobile ? '465' : '94%'">
        <v-divider class="ml-5 mr-5"/>            
          <v-chip-group 
            class="chart-chip-group"
            :active-class="chipGroupActiveClass"
            mandatory
            @click="chipGroupActiveClass = 'cyan--text text--accent-4'"
            :value="selectionChipGroup"
          >
            <v-chip small @click="[rangePicked=[], selectionChipGroup = 0,]">2주</v-chip>
            <v-chip small @click="[rangePicked=[], selectionChipGroup = 1,]">1달</v-chip>
            <v-chip small @click="[rangePicked=[], selectionChipGroup = 2,]">1분기</v-chip>            
            <v-menu 
              left bottom offset-y :close-on-content-click="false"
              v-model="menu"
            >
              <template v-slot:activator="{on, attrs}">
                <v-chip 
                  small
                  v-on="on"
                  v-bind="attrs"
                >                
                  <v-icon left small>
                    mdi-calendar
                  </v-icon>
                  날짜선택
                </v-chip>
              </template>
              <v-card>
                <v-date-picker                
                  :allowed-dates="allowedDates"
                  v-model="picked"
                  :month-format="monthFormat"
                  :header-date-format="monthFormat"
                  :weekday-format="weekdayFormat"
                  :show-current="false"
                  no-title
                  color="cyan"
                  range
                >
                  <v-btn plain @click="menu = false" color="error" class="date-action">
                    취소
                  </v-btn>
                  <v-btn plain @click="selectDate">
                    결정
                  </v-btn>
                </v-date-picker>
              </v-card>
            </v-menu>
          </v-chip-group>            
          
        <MarketChart          
          class="mt-9"
          :height="130"
          :type="market.type"
          :fill="false"
          :count="selectionChipGroup"
          :range="rangePicked"
        />
        
      </v-sheet>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';  
  import { ComputedMarket } from '@/v2/components/home/MarketTrend.vue';
  import MarketChart from '@/v2/components/home/MarketChart.vue'
  import { IMarketChartModel } from '@/models/market'
  import { namespace } from 'vuex-class'
  
  const MarketStoreModule = namespace('MarketStore')
  const REQUEST_DATE = [10, 30, 120]

  @Component({
    components: {
      MarketChart
    }
  })
  export default class MarketTrendFactory extends Vue {

    @Prop() market!: ComputedMarket
    @Prop() marketValuation!: any
    @Prop() contry!: string

    @MarketStoreModule.State('marketChart') marketChart!: IMarketChartModel

    expand = false
    menu = false
    selectionChipGroup = 0
    chipGroupActiveClass = 'cyan--text text--accent-4'
    picked = []
    rangePicked = []

    get title() {
      return this.marketValuation.market
    }

    get flag () {
      return this.contry === 'korea' ? '@/assets/koreaflag.png' : '@/assets/usaflag.png'
    }
    
    get mobile () {
      return this.$vuetify.breakpoint.name === 'xs'
    }

    get chipColor () {
      return this.marketValuation.weeklyTrend2 > 0 ? 'red darken-3' : 'primary'
    }

    getChipColor (trendRange: string) {
      return this.marketValuation[trendRange] > 0 ? 'red darken-3' : 'primary'
    }

    get per () {
      const close = this.market.close
      const changes = this.market.changes

      return (changes/(close-changes)) * 100
    }


    getChipContent (trendRange: string) {
      return {
        contry: this.contry === 'korea' ? '한국' : '미국',
        trend: this.marketValuation[trendRange] > 0 ? '상승' : '하락',
        textColor: this.marketValuation[trendRange] > 0 ? 'red--text' : 'blue--text'
      }
    }

    get chipContnet () {      
      return {
        contry: this.contry === 'korea' ? '한국' : '미국',
        trend: this.marketValuation.weeklyTrend2 > 0 ? '상승' : '하락',
        textColor: this.marketValuation.weeklyTrend2 > 0 ? 'red--text' : 'blue--text'
      }
    }

    get dateLastDay () {
      const labels = this.marketChart[this.market.type].labels
      return labels[labels.length-1]
    }

    get Picked () {
      const last = new Date(this.dateLastDay)      
      return [
        new Date(last.setDate(last.getDate() - REQUEST_DATE[this.selectionChipGroup])).toISOString().substr(0, 10),
        this.dateLastDay
      ]
    }

    set Picked (val) {
      this.picked = val
    }

    allowedDates(arg: string) {
      const current = new Date(arg).getTime()
      const last = new Date(this.dateLastDay).getTime()
      if(current < last) return arg
      return null          
    }

    monthFormat = (date: string) => {
      const split = date.split('-')
      if(split.length === 1) return `${split[0]}년`
      return `${split[0]}년 ${split[1]}월`      
    }

    weekdayFormat = (date: string) => {
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = week[new Date(date).getDay()];
      return dayOfWeek;
    }
    
    selectDate() {
      this.selectionChipGroup = 3      
      this.rangePicked = this.picked
      this.menu = false
    }

    mounted () {
      this.picked = this.Picked
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
  right: 15px;
  margin-top: 12px;
  gap: 3px;
}

.sparkline-sheet {
  position: absolute;
  right: 5px;
  top: 40px;
  transition: outline .5s ease-in;
}



.chart-chip-group-active {
  color: #00BCD4;
}

.chart-chip-datepicker {
  position: absolute;
  right: 5px; 
  margin-top: 20px;
}

.date-action {
  margin-left: 75px;
}
</style>