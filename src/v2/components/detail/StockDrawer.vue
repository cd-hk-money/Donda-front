<template>
  <v-carousel 
    cycle
    interval="500000000"
    hide-delimiter-background
    hide-delimiters
    :show-arrows="false"
    height="100%"
    vertical
    v-model="drawer"
>    
    <v-carousel-item>
      <stock />
    </v-carousel-item>

    <v-carousel-item>      
      <stock-finance :key="componentKey" />
    </v-carousel-item>

    <v-carousel-item>
      <v-row>
        <v-col cols="12" xl="6" lg="6" sm="12">
          <stock-similar />
        </v-col>
        <v-col cols="12" xl="6" lg="6" sm="12">
          <stock-news />
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import Stock from '@/v2/components/detail/Stock.vue'
import StockChart from '@/v2/components/detail/StockChart.vue'
import StockSimilar from '@/v2/components/detail/StockSimilar.vue'
import StockNews from '@/v2/components/detail/StockNews.vue'
import StockFinance from '@/v2/components/detail/StockFinance.vue'


@Component({
  components: {
    Stock,
    StockSimilar,
    StockNews,
    StockChart,
    StockFinance
  }
})
export default class StockDrawer extends Vue {

  @Prop()
  drawer!: number

  fab = false
  componentKey = 0

  drawerChange(select: number) {
    this.$emit('drawerChange', select)
  }

  forceRender() {
    this.componentKey += 1
  }
}
</script>