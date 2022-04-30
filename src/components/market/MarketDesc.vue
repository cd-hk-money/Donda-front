<template>
  <v-card    
    elevation="0"    
    max-height="20%"
    min-height="20%"    
  >
    <v-card-text>      
      <v-row>        
        <v-col cols="12" sm="auto">
          <span class="primary--text ml-3 text-h2 font-weight-bold">
            {{ desc.market }} 
          </span>
          <span class="primary--text text-h3 ml-5">
            {{ desc.close }}
          </span>           
          <span class="text-h5">
            {{ desc.changes }}%
          </span>     
        </v-col>      
        <v-col cols="12" sm="auto">               
          <div class="text-center">

          </div>
        </v-col>
      </v-row>
    </v-card-text>    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop }  from 'vue-property-decorator'

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
  @Prop({ default:'코드'}) private code!: string

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