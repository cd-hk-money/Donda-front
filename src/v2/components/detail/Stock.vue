<template>
  <v-card             
    height="787"
    width="100%"
    outlined
  >
    <v-card-title>
      주가
    </v-card-title>

    <v-card-subtitle>
      <span>{{ stock.name }}의 주가 정보를 확인해보세요.</span>
    </v-card-subtitle>
    
    <v-divider />
    <v-card
      elevation="0"
      height="50"
      class="d-flex justify-end align-center"
    > 
      <v-btn
        v-for="(menu, i) in menus"
        :key="i"
        icon
        class="mr-5"
        elevation="0"
        tile
        small
        v-model="menu.enable"
        @click="menu.callback"
      >
        <v-icon>{{ menu.icon }}</v-icon>
      </v-btn>
      <v-menu        
        left bottom offset-y :close-on-content-click="false"
        v-model="menu"
      >
        <template v-slot:activator="{on, attrs}">
          <v-btn
            class="mr-2"
            small
            icon
            v-on="on"
            v-bind="attrs"
            tile            
          >
           <v-icon>
            mdi-calendar
           </v-icon>
          </v-btn>          
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
    </v-card>
    <v-divider />
    <v-card-text v-if="!loaded">
      <stock-big-chart   
        :height="140"        
        :gradient="gradientEnable"
        :volume="volumeEnable"
      />        
    </v-card-text>  
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IStockModel } from '@/models/stock'
import { IMenu } from '@/v2/pages/MenuBar.vue'
import StockBigChart from '@/v2/components/detail/StockBigChart.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockBigChart
  }
})
export default class Stock extends Vue {
  
  count = 33
  dateOverlay = false
  gradientEnable = false
  volumeEnable = false
  menu = false
  picked = []
  rangePicked = []

  get width (): string | number { 
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '97%'
  }

  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: any
  @StockStoreModule.State('stockGraphAllLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphAllFlag') flag!: boolean  
  @StockStoreModule.Action('getStockGraphAll') getStockGraphAll!: (name: string) => Promise<void>
  @StockStoreModule.Action('getStockGraphDefault') getStockGraphDefault!: (name: string) => Promise<void>
    
  getGradient () { return this.gradientEnable }
  getVolumeEnable () { return this.volumeEnable }

  get lastDate () {
    const labels = Object.keys(this.stockGraphDefault)
    return labels[labels.length - 1]
  }
  
  get Picked () {
    const last = new Date(this.lastDate)      
    return [
      new Date(last.setDate(last.getDate() - this.count)).toISOString().substr(0, 10),
      this.lastDate
    ]
  }

  set Picked (val) {
    this.picked = val
  }

  @Watch('gradientEnable')
  watchGradient () {
    const content = this.menus.find((menu: IMenu) => menu.title === 'gradient')
    content.enable = !content.enable
  }

  @Watch('volumeEnable')
  watchVolume () {
    const content = this.menus.find((menu: IMenu) => menu.title === 'volume')
    content.enable = !content.enable
  }

  menus: IMenu[] = [    
    {
      title: 'volume',
      icon: 'mdi-chart-bar',
      callback: () => this.updateData({
        volumeEnable: !this.getVolumeEnable()
      }),      
      enable: this.volumeEnable,
    },     
  ]

  updateData(payload) {
    Object.entries(payload).forEach(state => {
      this[state[0]] = state[1]
    })         
  }

  allowedDates(arg: string) {
    const current = new Date(arg).getTime()
    const last = new Date(this.lastDate).getTime()
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
    this.menu = false
    this.rangePicked = this.picked
  }

  mounted () {    
    const code = this.$route.params.title    
    this.getStockGraphDefault(code)  
    this.getStockGraphAll(code)    
    this.picked = this.Picked
  }
  
}

</script>