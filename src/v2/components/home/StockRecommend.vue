<template>    
  <v-card
    class="mt-5 mr-5 align-center justify-center"
    height="44vh"
    width="auto"
    rounded="xl"
    elevation="0" 
  >
    <v-card-title             
      class="text-h4 font-weight-bold cyan--text ml-5">
      추천 종목
      <span>
        <v-btn
          icon      
          large
          @click="overlay = !overlay"
        >
          <v-icon>fa-solid fa-circle-info</v-icon>
        </v-btn>
      </span>
    </v-card-title>
     <v-sheet
      elevation="0"
      max-width="100%"
      v-show="!recommendLoaded"
      rounded="xl"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        mandatory
        show-arrows        
      >
        <v-slide-item
          v-for="recommend in recommends"
          :key="recommend.code"          
        >
          <v-card       
            elevation="1"     
            class="ma-4"
            height="280"
            width="265"            
            rounded="xl"
            outlined
            link
            :to="`/detail/${recommend.name}`"
          >
            <v-card-title class="text-h5" v-text="recommend.name"></v-card-title>
            <v-card-subtitle v-text="recommend.code"></v-card-subtitle>            
            <v-btn absolute top right icon>              
              <v-icon>fa-thin fa-flag</v-icon>              
            </v-btn>
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <span class="text-h4"> {{ recommend.close.toLocaleString()}}₩</span>
              <span :class="['text-h6 pl-1 pt-2', recommend.changes_ratio > 0 ? 'red--text' : 'blue--text']"> {{recommend.changes_ratio}}%</span>
            </v-row>
            
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet> 
    <v-overlay 
      :value="overlay"
      absolute
      opacity="0.88"
    >
      <v-btn         
        bottom
        @click="overlay = false">
        닫기
      </v-btn>
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { StockRecommendModel } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'


const MarketStoreModule = namespace('MarketStore')

@Component
export default class StockRecommend extends Vue {

  private model = null
  private overlay = false

  @MarketStoreModule.Action('getRecommend')
  private getRecommend!: () => Promise<void>

  @MarketStoreModule.State('recommend')
  private recommends!: StockRecommendModel[]

  @MarketStoreModule.State('recommedLoaded')
  private recommendLoaded!: boolean

  created () {
    this.getRecommend()
  }
}
</script>