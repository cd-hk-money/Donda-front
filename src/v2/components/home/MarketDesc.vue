<template>
  <v-card    
    v-show="!loaded"
    elevation="0"    
    max-height="20%"
    min-height="20%"    
  >
    <v-card-text>      
      <v-row>        
        <v-col cols="12" xl="9">
          <span class="primary--text text-h2 font-weight-bold pl-10">
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
          <span class="primary--text ml-12 text-h3">
            {{ desc.close }}
          </span>           
          <span :class="['text-h4', color]">
            {{ desc.changes * 100}} %
          </span>               
        </v-col>            

        <v-col cols="12" xl="3">          
          <span class="text-h7">
            갱신일 : {{ desc.recent }}
          </span>     
          <v-btn
            v-model="fill" 
            class="mx-1"
            elevation="0"              
            small          
            @click="fillChange"  
          >
            <v-icon>mdi-chart-areaspline-variant</v-icon>
          </v-btn>

          <v-btn 
            class="mx-1"
            elevation="0"              
            small
            tile
            @click="changeRequestDate(0.5)"
          >
            <v-icon>fa-thin fa-magnifying-glass-plus</v-icon>
          </v-btn>
          
          <v-btn        
            class="mx-1"     
            elevation="0"              
            small
            tile
            @click="changeRequestDate(1.5)"
          >
            <v-icon>fa-thin fa-magnifying-glass-minus</v-icon>
          </v-btn>            

          <v-btn        
            class="mx-1"     
            elevation="0"                          
            small
            tile
          >
            <v-icon>fa-regular fa-calendar</v-icon>
          </v-btn>            
        </v-col>  
        
      </v-row>
    </v-card-text>        
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit }  from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import MarketChart from '@/v2/components/home/MarketChart.vue'

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
  }) private desc!: IMarketRecentModel

  @Prop({ default: 'ㅇㅇ'})
  private date!: string | undefined


  @MarketStoreModule.Mutation('updateRequestDate')
  private updateRequestDate!: (payload: number) => void
  
  @MarketStoreModule.State('marketLoaded')
  private loaded!: boolean
  
  private toggle_exclusive = 0

  private color = this.desc?.changes > 0 ? 'green--text' : 'red--text'

  private changeRequestDate (date: number) {
    this.updateRequestDate(date)    
  }
  
  private fill = true

  private fillChange () {    
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


