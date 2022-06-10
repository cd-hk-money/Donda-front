<template>
  <v-card    
    elevation="0"    
    max-height="20%"
    min-height="20%"    
  >
    <v-card-text>      
      <v-row>        
        <v-col cols="12" xl="8" lg="8" md="7">
          <span class="text-h2 font-weight-bold pl-10">
            {{ type }} 
          </span>

          <span class="mr-5">
            <v-btn               
              icon
              absolute
            >
              <v-icon>fa-solid fa-circle-info</v-icon>  
            </v-btn>
          </span>

          <span class="ml-12 text-h3">
            {{ desc.close }}
          </span>           

          <span :class="['text-h4', color]">
            {{ desc.changes > 0 ? '+' + (desc.changes * 100).toFixed(2):(desc.changes * 100).toFixed(2)}} %
          </span>               
        </v-col>            

        <v-col cols="12" xl="4" lg="4" md="5">          
          <span class="text-h7 ml-12">
            갱신일 : {{ desc.recent }}
          </span>     

          <v-tooltip
            v-for="menu in menus"
            :key="menu.icon"
            bottom
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                v-model="menu.enable"
                class="mx-1"
                elevation="0"
                small
                tile
                v-on="on"
                v-bind="attrs"
                @click="menu.callback"
              >
                  <v-icon>{{ menu.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ menu.tooltip }}</span>
          </v-tooltip>

          <v-speed-dial            
            absolute
            v-model="dial"
            right
            top
            direction="bottom"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn                        
                class="mx-1"     
                elevation="0"                          
                small
              >
                <v-icon>fa-regular fa-calendar</v-icon>
              </v-btn>                          
            </template>
              <v-btn                
                v-for="item in dateTooltips"
                :key="item.icon"                   
                small
                @click="item.callback"
              >
                {{ item.title }}
              </v-btn>            
          </v-speed-dial>            
        </v-col>          
      </v-row>
    </v-card-text>      
    <v-divider></v-divider>  
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }  from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IMenu } from '@/v2/pages/MenuBar.vue'

const MarketStoreModule = namespace('MarketStore')

// models
import { IMarketRecentModel } from '@/models/market'

@Component
export default class MarketDesc extends Vue {

  @Prop()
  type!: string

  @MarketStoreModule.Mutation('updateRequestDate')
  updateRequestDate!: (payload: number) => void
  
  @MarketStoreModule.State('marketRecents')
  marketRecents!: IMarketRecentModel 
  
  // 그래프 채움 여부
  fill = false

  // 날짜 선택 다이얼 여부
  dial = false

  // 시장 정보
  desc: any

  // 시장 가격 색상
  color!: string

  // 시장 정보 메뉴
  menus: IMenu[] = [
    {
      icon: 'mdi-chart-waterfall',    
      tooltip: '봉차트로 전환',
      callback: () => console.log('ss'),
    },
    {
      icon: 'mdi-chart-areaspline-variant',    
      tooltip: '차트 색상 채우기',
      callback: () => this.fillChange() ,
      enable: this.fill
    },
    {
      icon: 'fa-thin fa-magnifying-glass-plus',    
      tooltip: '확대',
      callback: () => this.changeRequestDate(0.5)
    },
    {
      icon: 'fa-thin fa-magnifying-glass-minus',    
      tooltip: '축소',
      callback: () => this.changeRequestDate(1.5) 
    },
  ]

  // 날짜 선택 다이얼 메뉴
  dateTooltips: IMenu[] = [
    {
      tooltip: '그룹 편집',
      title: '20일',
      callback: () => this.changeRequestDate(20)
    },
    {
      tooltip: '그룹 추가',
      title: '분기',
      callback: () => this.changeRequestDate(30)
    },
    {
      tooltip: '그룹 삭제',
      title: '년',
      callback: () => this.changeRequestDate(360)
    }
  ]

  @Watch('fill')
  watchFill () {
    this.menus[1].enable = !this.menus[1].enable    
  }

  changeRequestDate (date: number) {
    this.updateRequestDate(date)    
  }
  
  fillChange () {    
    if(this.fill) this.$emit('fillChange', false)
    else this.$emit('fillChange', 'start')

    this.fill = !this.fill    
  }  

  created () {    
    this.desc = this.marketRecents[this.type]
    this.color = this.marketRecents[this.type].changes > 0 ? 'red--text' : 'blue--text'     
  }
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}  
</style>


