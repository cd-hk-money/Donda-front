<template>
  <v-card 
    class="ml-5 mr-5 mt-7"
    :height="mobile ? 600 : 260"
    rounded="xl"
    width="95%"
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
      <!-- <span id="date">
        기준일 :{{ stock.date }}
      </span> -->
    </v-card-title>

    <v-card-subtitle class="ml-5">
      자체 계산한 적정 주가를 보여줍니다.
    </v-card-subtitle>
    <v-row>
      <v-col cols="12" xl="7">
        <v-carousel 
          cycle
          hide-delimiter-background
          hide-delimiters
          vertical
          interval="5000"
          height="100%"
          v-model="carousel"
          :show-arrows="false"
          v-if="!loaded"
        >
          <v-carousel-item>
            <stock-score-bar-chart :height="mobile ? 250 : 200" />
          </v-carousel-item>
          <v-carousel-item>
            <stock-chart 
              class="ml-5 mr-5 mt-10"              
              :height="mobile ? 236 : 200"
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>      
      <v-divider vertical></v-divider>

      <v-col cols="12" xl="5" lg="5" sm="12" md="12" class="text-center align-center mt-7">
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

  overlay = false
  carousel = 0

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  
  @StockStoreModule.State('stockLoaded')
  loaded!: boolean

  @StockStoreModule.Action('getStockGraphDefault')
  getStockGraphDefault!: (name: string) => Promise<void>

  drawerChange () {
    this.$emit('drawerChange', 1)
  }

  created () {
    this.getStockGraphDefault(this.$route.params.title)    
  }
}
</script>

<style>
  #date {
    margin-left: 180px;
    font-size: 13px;
  }
</style>