<script lang="ts">
  import { AsyncPayload } from '@/store/payload';
  import { StockSimpleModel } from '@/models/stock';
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  const MarketStoreModule = namespace('MarketStore')
  const StockStoreModule = namespace('StockStore')

  type CodeTitleMapping = {
    [title: string]: string
  }

  type IDailySimpleRank = {
    marcap: (number | string)[]
    change_incr: (number | string)[]
    change_redu: (number | string)[] 
    volume: (number | string)[]
  }

  @Component
  export default class StoreMixin extends Vue {
    @MarketStoreModule.State('searchTableLoaded') searchTableLoaded!: boolean
    @MarketStoreModule.State('searchTable') searchTable!: StockSimpleModel[]
    @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: CodeTitleMapping
    @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean
    @MarketStoreModule.State('dailySimpleRanks') dailySimpleRanks!: IDailySimpleRank
    @MarketStoreModule.State('dailySimpleRanksLoaded') dailySimpleRanksLoaded!: boolean
    

    @StockStoreModule.Action('callRequest') readonly callRequest!: (payload: AsyncPayload) => Promise<void>
    
  }
</script>