<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover             
  >
    <v-carousel-item      
      v-for="(slide, i) in slides"
      :key="i"      
    >
      <v-sheet        
        :color="colors[i]"        
      >        
        <v-row          
          class="fill-height"        
          align="center"
          justify="center"
        >
          <v-col                      
            cols="12"
            sm="10"
          >                   
          </v-col>
          <v-col                
            cols="12"
            sm="12"
          >
            <market-chart color="white" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>      
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

// components
import MarketChart from '@/components/market/MarketChart.vue'

// models
import { MarketDescModel } from '@/models/market'


@Component({
  components: {
    MarketChart,    
  }
})
export default class MarketCarousel extends Vue {

  @Prop() private color!: Array<string>
  @Prop() private slides!: Array<MarketDescModel>
}


</script>