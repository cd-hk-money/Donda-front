<template>
  <v-card
    elevation="0"
    rounded="xl"
    class="mx-auto" 
    :color="color"
  >
    <v-card-text>      
      <span class="text-h3 text--primary font-weight-bold">
        {{ desc.market }} 
      </span>
      <span class="text-h5 ">
        {{ desc.code }}
      </span>
      <p class="text-h5 font-weight-light">
        <!-- {{ desc.close }} , {{ desc.trans }}% -->
      </p>
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
  @Prop() private color!: string
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