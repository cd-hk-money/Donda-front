<template>
  <v-dialog    
    v-model="dialog"
    max-width="30%"
    min-height="100%"
  >        
    <template v-slot:activator="{ on, attrs }">        
      <v-btn             
        elevation="0"
        rounded
        block 
        :dark="dark"
        v-bind="attrs"         
        v-on="on"            
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>

    <v-card   
      rounded="xl"
      dark
      height="100%">
      <v-card-title class="text-h6 font-weight-bold cyan--text">
        기업명, 코드로 종목을 찾아보세요.
      </v-card-title>

      <v-spacer></v-spacer>

      <v-card-text>
        <v-autocomplete   
          v-model="searchTable"            
          :items="items"
          v-show="loaded"   
          :search-input.sync="search"
          autofocus
          dark              
          rounded
          hide-details
          hide-no-data
          solo-inverted
          cache-items   
          ref="autoinput"
          @keypress.enter="push(search)"
        >       
        </v-autocomplete>
      </v-card-text>

      <v-spacer></v-spacer>

      <v-card-text>
        이런 종목은 어떠세요?
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// models
import { StockSimpleModel } from '@/models/stock'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockSearch extends Vue {
  @StockStoreModule.State('searchTable')
  private readonly searchTable!: Array<string>

  @StockStoreModule.State('stocks')
  private stocks!: StockSimpleModel[]

  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.Mutation('setCode')
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  private setTitle!: (title: string) => void

  @Prop({default: false}) private dark!: boolean  

  // 검색창 
  private search: any = null

  // 검색창 다이어로그
  private dialog = false

  // 자동완성 항목
  private items: Array<string> = []
  private inputMode = false
  private groupTitle = ''

  @Watch("search")
  public watchSearch(val: unknown) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }

  private querySelections(val: any) {
    let timeout=  0
    window.clearTimeout(timeout)
    setTimeout(() => {
      this.items = this.searchTable.filter(e => {
        return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
      })
    })
  }

  private push(title: string): void {            
    try{
      const stock = this.stocks.find((stock: StockSimpleModel) => {
        stock.title === title
      }) as StockSimpleModel
      this.setCode(stock.code)
      this.setTitle(title)
      this.$router.push(`/detail/${stock.code}`)
    } catch(e: any) {     
      console.log(e)
    }  
  }
}
</script>