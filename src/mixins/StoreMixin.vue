<script lang="ts">
import { AsyncPayload } from '@/store/payload';
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

  @StockStore.Action('callRequest') readonly callRequest!: (payload: AsyncPayload) => void
  
}
</script>