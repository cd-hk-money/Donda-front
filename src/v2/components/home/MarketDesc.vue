<template>
  <v-card    
    v-show="!loaded"
    elevation="0"    
    max-height="20%"
    min-height="20%"    
  >
    <v-card-text>      
      <v-row>        
        <v-col cols="12" xl="8" lg="8" md="7">
          <span class="text-h2 font-weight-bold pl-10">
            {{ desc.market }} 
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
            {{ desc.changes * 100}} %
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
            v-model="fab"
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

  @Prop({
    default: () => {
      return {
        market: '시장이름',
        close: '종가',
        trans: '변화량' 
      }
    }
  }) desc!: IMarketRecentModel

  @Prop({ default: 'ㅇㅇ'})
  date!: string | undefined


  @MarketStoreModule.Mutation('updateRequestDate')
  updateRequestDate!: (payload: number) => void
  
  @MarketStoreModule.State('marketLoaded')
  loaded!: boolean
  
  toggle_exclusive = 0

  color = this.desc?.changes > 0 ? 'red--text' : 'blue--text'

  fill = true
  fab = false
  dateToggle = 1

  @Watch('fill')
  watchFill () {
    this.menus[1].enable = !this.menus[1].enable    
  }

  menus: IMenu[] = [
    {
      icon: 'mdi-chart-waterfall',    
      tooltip: '봉차트로 전환',
      callback: () => undefined,
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

  changeRequestDate (date: number) {
    this.updateRequestDate(date)    
  }
  
  fillChange () {    
    if(this.fill) this.$emit('fillChange', false)
    else this.$emit('fillChange', 'start')

    this.fill = !this.fill    
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


