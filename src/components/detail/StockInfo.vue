<template>  
  <v-row>      
    <v-col cols="12" sm="auto">
      <v-card
        class="grey darken-4 pt-mr-auto" 
        elevation="0"
        max-height="90%"
        rounded="ml"        
        hover        
      >
        <v-card-title class="text-h4 font-weight-bold">
          {{ title }}          
        </v-card-title>
        <v-card-subtitle>
          {{ code }}
        </v-card-subtitle>          
      </v-card>
    </v-col>    
    <v-col cols="12" sm="auto">        
      <v-card      
        v-if="!loading"   
        class="grey darken-4 pt-mr-auto" 
        elevation="0" 
        min-height="90%"
        rounded="ml"     
        hover           
      >        
         {{ stockDetail }} .. 디테일 정보들 표시 예정

      </v-card>
    </v-col>
    <v-col cols="12" sm="auto">        
      <v-card 
        max-width="auto"
        min-height="auto"
        class="grey darken-4 pt-mr-auto"
      >          
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockInfo extends Vue {
  @StockStoreModule.State('code')
  private code!: string 

  @StockStoreModule.State('title')
  private title!: string   

  @StockStoreModule.State('loading')
  private loading!: boolean

  @StockStoreModule.State('stockDetail')
  private stockDetail!: any
  
}
</script>
