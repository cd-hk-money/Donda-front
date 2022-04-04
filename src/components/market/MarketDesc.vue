<template>
  <v-card    
    dark
    elevation="0"
    rounded="xl"
    class="mx-auto" 
    :color="color"
  >
    <v-card-text>      
      <v-row>
        <v-col cols="12" sm="4">
          <span class="text-h3 font-weight-bold">
            {{ desc.market }} 
          </span>
          <span class="text-h5 ">
            0000{{ desc.code }}
          </span>                
        </v-col>
        <v-col cols="12" sm="7">          
        </v-col>
        <v-col cols="12" sm="1">                    
          <v-btn 
            class="ma-2"
            outlined
            depressed
          >
            자세히
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop }  from 'vue-property-decorator'

// models
import { MarketDescModel } from '../../models/market'

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
  }) private desc!: MarketDescModel
  @Prop({ default: 'white'}) private color!: string
  @Prop({ default:'코드'}) private code!: string

  private reveal: boolean = false
  
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