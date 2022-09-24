<template>
  <v-card elevation="0">
    <v-card-text>      
      <span class="text-h5 font-weight-bold ml-3">
        {{ type.toUpperCase() }} 
      </span>

      <span class="mr-5">
        <v-btn    
          x-small           
          icon
          absolute
        >
          <v-icon>fa-solid fa-circle-info</v-icon>  
        </v-btn>
      </span>

      <span class="ml-5 text-h5">
        {{ desc.close }}
      </span>           

      <span :class="['text-h5', color] ">
        {{ desc.changes > 0 ? '+' + (desc.changes * 100).toFixed(2):(desc.changes * 100).toFixed(2)}} %
      </span>                       
    </v-card-text>      
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }  from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IMenu } from '@/v2/pages/MenuBar.vue'

const MarketStoreModule = namespace('MarketStore')

// models
import { IMarketRecentModel } from '@/models/market'
import { mobileHeight } from '@/mixins/tools'

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
    // {
    //   icon: 'mdi-chart-waterfall',    
    //   tooltip: '봉차트로 전환',
    //   callback: () => console.log('ss'),
    // },
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

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
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


