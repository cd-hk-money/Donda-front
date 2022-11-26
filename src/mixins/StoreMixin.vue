<script lang="ts">
import { AsyncPayload } from '@/store/payload';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import {
  CodeTitleMappingType,
  DailySimpleRankType,
  MarketRecentType,
  MarketType,
  MarketValuationType,
  SearchTableType,
} from '@/models/market'

import { StoreState } from '@/store';

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')

@Component
export default class StoreMixin extends Vue {
  @MarketStoreModule.State('searchTable') searchTable!: StoreState<SearchTableType>
  @MarketStoreModule.State('dailySimpleRanks') dailySimpleRanks!: StoreState<DailySimpleRankType>
  @MarketStoreModule.State('marketValuation') marketValuation!: StoreState<MarketValuationType>
  @MarketStoreModule.State('market') market!: StoreState<MarketType>

  @MarketStoreModule.Getter('codeTitleMapping') codeTitleMapping!: CodeTitleMappingType
  @MarketStoreModule.Getter('marketRecents') marketRecents!: MarketRecentType    
  
  @MarketStoreModule.Action('callRequestMarket') readonly callRequestMarket!: (payload: AsyncPayload) => Promise<void>
  @StockStoreModule.Action('callRequest') readonly callRequest!: (payload: AsyncPayload) => Promise<void>    
}
</script>