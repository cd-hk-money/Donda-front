<template>
  <v-carousel 
    class="detail__stock-drawer"
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
      <stock-valuation/>
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

    <v-carousel-item>
      <stock-indicator-detail />
    </v-carousel-item>

  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator'
import Stock from '@/v2/components/detail/Stock.vue'
import StockSimilar from '@/v2/components/detail/StockSimilar.vue'
import StockNews from '@/v2/components/detail/StockNews.vue'
import StockFinance from '@/v2/components/detail/StockFinance.vue'
import StockValuation from '@/v2/components/detail/StockValuation.vue'
import StockIndicatorDetail from './StockIndicatorDetail.vue'
import { mobileHeight } from '@/mixins/tools' 


@Component({
  components: {
    Stock,
    StockSimilar,
    StockNews,
    StockFinance,
    StockValuation,
    StockIndicatorDetail
  }
})
export default class StockDrawer extends Vue {

  // datas
  fab = false
  componentKey = 0

  get width () {
    return this.$vuetify.breakpoint.name === 'xs' ? 465 : '100%'
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  @Prop() drawer!: number
  
  drawerChange(select: number) {
    this.$emit('drawerChange', select)
  }

}
</script>

<style>

</style>