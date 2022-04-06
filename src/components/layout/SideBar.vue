<template>
  <v-navigation-drawer
    expand-on-hover
    dark 
    left
    absolute
    bottom    
    floating  
  >
    <v-list>
      <v-list> 
        
      </v-list>
      <v-autocomplete      
        cless="mx-4"
        dense            
        flat
        rounded
        solo-inverted
        cache-items   
        ref="autoinput"
        v-model="searchTable"            
        :items="items"
        :search-input.sync="search"
        hide-no-data
        hide-details        
        @keypress.enter="push(search)"
      >

      </v-autocomplete>
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>관심종목 그룹 1</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>관심종목 그룹 2</v-list-item-title>
      </v-list-item>
      
    </v-list>    
      <template v-slot:append>             
        <div class="pa-2">
          <v-btn 
            target="_blank"
            href="https://github.com/cd-hk-money"
            icon
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </div>            
      </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// models

const StockStoreModule = namespace('StockStore')

@Component
export default class SideBar extends Vue {

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void

  @StockStoreModule.State('searchTable')
  private searchTable!: Array<string>

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private setTitle!: (title: string) => void

  private search: any = null
  private items: Array<string> = []

  @Watch("search")
  public watchSearch(val: any) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }

  private querySelections(val: any) {
    let timeout: number=  0
    window.clearTimeout(timeout)
    setTimeout(() => {
      this.items = this.searchTable.filter(e => {
        return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
      })
    })
  }
  
  created() {
    this.requestTodayMarket()
  }

  private push(): void {
    this.setCode('000000')
    this.setTitle(this.search)
    this.$router.push(`/detail/${this.search}`)
  }

}
</script>
