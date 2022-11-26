<script lang="ts">
  import { AsyncPayload } from '@/store/payload';
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import {
    CodeTitleMapping,
    IDailySimpleRank,
    IMarketRecentModel,
    MarketType,
    MarketValuationType,
SearchTableType,
  } from '@/models/market'

  import { StockSimpleModel } from '@/models/stock'
  import { StoreState } from '@/store';

  const MarketStoreModule = namespace('MarketStore')
  const StockStoreModule = namespace('StockStore')

  @Component
  export default class StoreMixin extends Vue {
    @MarketStoreModule.State('searchTable') searchTable!: StoreState<SearchTableType>
    @MarketStoreModule.State('dailySimpleRanks') dailySimpleRanks!: IDailySimpleRank
    @MarketStoreModule.State('dailySimpleRanksLoaded') dailySimpleRanksLoaded!: boolean
    @MarketStoreModule.State('marketValuation') marketValuation!: StoreState<MarketValuationType>
    @MarketStoreModule.State('market') market!: StoreState<MarketType>

    @MarketStoreModule.Getter('codeTitleMapping') codeTitleMapping!: CodeTitleMapping
    @MarketStoreModule.Getter('marketRecents') marketRecents!: IMarketRecentModel    
    
    @StockStoreModule.Action('callRequest') readonly callRequest!: (payload: AsyncPayload) => Promise<void>    
    @MarketStoreModule.Action('callRequestMarket') readonly callRequestMarket!: (payload: AsyncPayload) => Promise<void>
  }
</script>