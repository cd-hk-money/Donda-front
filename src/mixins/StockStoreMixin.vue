<script lang="ts">
import { StockType, VolumeType, GraphDefaultType, GraphAllType, EvaluationType, EvaluationDailyType, SimilarType, NewsType, StatementType, StatementAllType, IndicatorType, IndicatorSectorType, IndicatorDailyType, DondaType, StocksType, IndicatorSectorDailyType } from '@/models/stock';
import { AsyncPayload } from '@/store/payload';
import { StoreState } from '@/store/utils';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const StockStoreModule = namespace('StockStore')

@Component
export default class StockStoreMixin extends Vue {

  @StockStoreModule.State('stock') stock!: StoreState<StockType>
  @StockStoreModule.State('stockGraphVolume') stockGraphVolume!: StoreState<VolumeType>
  @StockStoreModule.State('stockGraphDefault') stockGraphDefault!: StoreState<GraphDefaultType>
  @StockStoreModule.State('stockGraphAll') stockGraphAll!: StoreState<GraphAllType>
  @StockStoreModule.State('stockEvaluation') stockEvaluation!: StoreState<EvaluationType>
  @StockStoreModule.State('stockEvaluationDaily') stockEvaluationDaily!: StoreState<EvaluationDailyType>
  @StockStoreModule.State('similarContents') similarContents!: StoreState<SimilarType>
  @StockStoreModule.State('news') newes!: StoreState<NewsType>
  @StockStoreModule.State('statement') statement!: StoreState<StatementType>
  @StockStoreModule.State('statementAll') statementAll!: StoreState<StatementAllType>
  @StockStoreModule.State('indicator') indicator!: StoreState<IndicatorType>
  @StockStoreModule.State('indicatorSector') indicatorSector!: StoreState<IndicatorSectorType>
  @StockStoreModule.State('indicatorDaily') indicatorDaily!: StoreState<IndicatorDailyType>
  @StockStoreModule.State('indicatorSectorDaily') indicatorSectorDaily!: StoreState<IndicatorSectorDailyType>
  @StockStoreModule.State('stockDonda') stockDonda!: StoreState<DondaType>
  @StockStoreModule.State('recommendStocks') recommendStocks!: StoreState<StocksType>
  @StockStoreModule.State('recommendStockCodes') recommendStockCodes!: StoreState
    
  @StockStoreModule.Action('callRequest') callRequest!: (payload: AsyncPayload) => Promise<void>
}
</script>