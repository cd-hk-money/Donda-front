<template>
  <v-card
    elevation="1"
    rounded="xl"
    class="mx-auto" 
    :color="color"
  >
    <v-card-text>      
      <p class="text-h4 text--primary font-weight-bold">
        {{ desc.market }}
      </p>
      <p class="text-h5 font-weight-light">
        {{ desc.close }} , {{ desc.trans }}%
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

  @Prop() private desc!: MarketDescModel
  @Prop() private color!: string

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