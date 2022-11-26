<script lang="ts">
  import { AsyncPayload } from '@/store/payload';
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import {
    CodeTitleMapping,
    IDailySimpleRank,
    IMarketRecentModel,
    IMarketValuationModel,
    IMarketChartModel
  } from '@/models/market'

  import { StockSimpleModel } from '@/models/stock'

  const MarketStoreModule = namespace('MarketStore')
  const StockStoreModule = namespace('StockStore')

  @Component
  export default class StoreMixin extends Vue {
    @MarketStoreModule.State('searchTableLoaded') searchTableLoaded!: boolean
    @MarketStoreModule.State('searchTable') searchTable!: StockSimpleModel[]
    @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: CodeTitleMapping
    @MarketStoreModule.State('marketLoaded') marketLoaded!: boolean
    @MarketStoreModule.State('dailySimpleRanks') dailySimpleRanks!: IDailySimpleRank
    @MarketStoreModule.State('dailySimpleRanksLoaded') dailySimpleRanksLoaded!: boolean
    @MarketStoreModule.Getter('marketRecents') marketRecents!: IMarketRecentModel    
    @MarketStoreModule.State('marketValuation') marketValuation!: IMarketValuationModel[]
    @MarketStoreModule.State('marketValuationLoaded') marketValuationLoaded!: boolean
    @MarketStoreModule.State('market') market!: IMarketChartModel
    
    @MarketStoreModule.Action('getMarketValuation') getMarketValuation!: () => Promise<void>
    @MarketStoreModule.Action('getTodayMarket') getTodayMarket!: () => Promise<void>

    @StockStoreModule.Action('callRequest') readonly callRequest!: (payload: AsyncPayload) => Promise<void>    
  }
</script>