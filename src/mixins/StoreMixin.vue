<script lang="ts">
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
  
}
</script>