<template>
  <v-row>
    <v-col  
      cols="12"
      xl="4"
      lg="4"
      v-for="rankType in Object.keys(dailySimpleRanks)"
      :key="rankType"
      >
        <rank-component
          :type="rankType"
          :contents="dailySimpleRanks[rankType].slice(0, 10)"
        />
    </v-col>
  </v-row>  
</template>

<script lang="ts">
import { IMarketRank } from '@/models/stock'
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import RankComponent from '@/v2/components/rank/RankComponent.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    RankComponent
  }
})
export default class RankV2 extends Vue {

  @StockStoreModule.Action('getDailySimpleRanks')  
  readonly getDailySimpleRanks!: () => Promise<void>

  @StockStoreModule.State('dailySimpleRanks')
  dailySimpleRanks!: IMarketRank

  @StockStoreModule.State('dailySimpleRanksLoaded')
  loaded!: boolean
  
  created () {
    this.getDailySimpleRanks().then(() => {
      console.log(this.dailySimpleRanks)
    })
  }
}
</script>