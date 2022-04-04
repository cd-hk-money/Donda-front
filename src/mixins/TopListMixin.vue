<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// models
import { StockSimpleModel } from '@/models/stock'

// stores
const StockStoreModule = namespace('StockStore')

@Component 
export default class TopListMixin extends Vue {
  
  @StockStoreModule.State('stocks')
  public stock!: StockSimpleModel[]

}
</script>