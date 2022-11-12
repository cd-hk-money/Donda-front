<script lang="ts">
import { AsyncPayload } from '@/api/stocks';
import { StockSimpleModel } from '@/models/stock';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const MarketStore = namespace('MarketStore')
const StockStore = namespace('StockStore')

type CodeTitleMapping = {
  [title: string]: string
}

@Component
export default class StoreMixin extends Vue {
  @MarketStore.State('searchTableLoaded') searchTableLoaded!: boolean
  @MarketStore.State('searchTable') searchTable!: StockSimpleModel[]
  @MarketStore.State('codeTitleMapping') codeTitleMapping!: CodeTitleMapping
  @MarketStore.State('marketLoaded') marketLoaded!: boolean

  @StockStore.Action('getAPI') readonly getAPI!: (payload: AsyncPayload) => void
  
}
</script>