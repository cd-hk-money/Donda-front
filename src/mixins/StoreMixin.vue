<script lang="ts">
import { AsyncPayload } from '@/api/market';
import { StockSimpleModel } from '@/models/stock';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const MarketStore = namespace('MarketStore')
const StockStore = namespace('StockStore')
const InterestStore = namespace('InterestStore')

@Component
export default class StoreMixin extends Vue {
  @MarketStore.State('searchTableLoaded') searchTableLoaded!: boolean
  @MarketStore.State('searchTable') searchTable!: StockSimpleModel[]
  @MarketStore.State('codeTitleMapping') codeTitleMapping!: any

  @MarketStore.State('marketLoaded') marketLoaded!: boolean

  @StockStore.Action('getAPI')
  public getAPI!: (payload: AsyncPayload) => void
  
}
</script>