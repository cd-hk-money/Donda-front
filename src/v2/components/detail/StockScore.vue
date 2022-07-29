<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="cardHeight"
    outlined    
    width="465"    
  >
    <v-card-title class="ml-5">
      적정주가
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
        @click="overlay = true"
      ><v-icon>fa-solid fa-circle-question</v-icon>
      </v-btn>      
    </v-card-title>

    <v-card-subtitle class="ml-5">
      자체 계산한 적정 주가를 보여줍니다.
    </v-card-subtitle>
    <v-row>
      <v-col cols="12" xl="7">
        <template v-if="!loaded && !graphLoaded">
          <v-carousel 
            cycle
            hide-delimiter-background
            hide-delimiters
            vertical
            interval="5000"
            height="100%"
            v-model="carousel"
            :show-arrows="false"            
          >
            <v-carousel-item>
              <stock-score-bar-chart :height="230" />
            </v-carousel-item>
            <v-carousel-item>
              <stock-chart :height="230" />                
            </v-carousel-item>
          </v-carousel>
        </template>
        <template v-else>
          <div class="text-center stockinfo-progress-circular">
            <v-progress-circular
              indeterminate
              color="#40E0D0"
            ></v-progress-circular>
          </div>
        </template>
      </v-col>      
      <v-divider vertical></v-divider>

      <v-col cols="12" xl="5" lg="5" sm="12" md="12" xs="12" class="text-center align-center mt-3">
        <div class="text-h4">20%</div>
        <div> 저평가 되었습니다.</div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn  
              v-on="on"
              v-bind="attrs"
              class="ml-1"
              icon         
              @click="drawerChange"     
            ><v-icon>fa-solid fa-circle-info</v-icon>
            </v-btn>
          </template>
          <span>자세히..</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-overlay 
      :value="overlay"
      opacity="0.88"
      absolute
      height="300"
    >
      <div>
        주가 계산 방법에 대한 설명..
      </div>
      <div class="d-flex justify-center">
        <v-btn 
          bottom
          @click="overlay = false">
          닫기
        </v-btn>
      </div>
    </v-overlay>
  </v-card>      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

import StockScoreBarChart from './StockScoreBarChart.vue'
import StockChart from '@/v2/components/detail/StockChart.vue'
import { IStockModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockScoreBarChart,
    StockChart
  }
})
export default class StockScore extends Vue {

  // datas
  overlay = false
  carousel = 0

  // store
  @StockStoreModule.State('stockLoaded') loaded!: boolean
  @StockStoreModule.State('stockGraphDefaultLoaded') graphLoaded!: boolean
  @StockStoreModule.Action('getStockGraphDefault') readonly getStockGraphDefault!: (name: string) => Promise<void>

  // computed
  get mobile () { return mobileHeight(this.$vuetify.breakpoint.name) < 500 }
  get cardHeight (): number { return this.$vuetify.breakpoint.name === 'xs' ? 500 : 260 }

  // methods
  drawerChange () {
    this.$emit('drawerChange', 3)
  }

  // hooks
  created () {
    this.getStockGraphDefault(this.$route.params.title)    
  }
}
</script>

<style scoped>
#date {
  margin-left: 180px;
  font-size: 13px;
}

.stockinfo-progress-circular {
  top: 50%;
  left: 30%;  
  position: absolute;
}
</style>