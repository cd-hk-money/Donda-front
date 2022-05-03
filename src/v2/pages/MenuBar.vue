<template>
  <div class="mr-10">
    <v-card          
      id="temp" 
      width="100%"
      class="d-flex justify-space-between mt-5 mr-5"        
      rounded="xl"
    >
      <v-tooltip 
        v-for="menu in menus"
        :key="menu.icon"
        bottom
      >
        <template v-slot:activator="{on, attrs }">
          <v-btn          
            class="ml-1 mt-3"
            v-on="on"
            v-bind="attrs"
            large
            rounded
            icon                  
            :link="menu.link"
            :to="menu.to"
            @click="menu.callback"            
          >
            <v-icon>{{ menu.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ menu.tooltip }}</span>
      </v-tooltip>

      <v-switch           
        color="grey"        
        :value="darkMode"          
        @change="toggleDarkMode"         
        class="ml-2 pt-1 mb-1"      
        inset
      ></v-switch>

    </v-card>
    
    <v-expand-transition>
      <v-card   
        class="mt-2"
        v-show="expand"
        width="256"
        height="80"
        rounded="xl"
        elevation="0"
      >
        <v-card-text>
          <v-autocomplete    
            :loading="loading"           
            v-model="searchs"            
            :items="items"
            :search-input.sync="search"
            autofocus
            rounded
            hide-details
            hide-no-data
            solo-inverted
            cache-items   
            clearable
            validate-on-blur
            ref="autoinput"  
            @keypress.enter="push(search)"   
          >       
          </v-autocomplete>
        </v-card-text>        
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { StockSimpleModel } from '@/models/stock'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')

export interface IMenu {
  icon?: string,
  tooltip?: string,
  color?: string | undefined
  link?: boolean | undefined
  to?: string | undefined
  callback?(): boolean | any | undefined,
  tile?: boolean | undefined
  enable?: boolean
  title?: string | undefined
}

@Component
export default class MenuBar extends Vue {

  @MarketStoreModule.State('searchTable')
  private searchTable!: StockSimpleModel[]

  private searchs = ''
  
  private menus: IMenu[] = [    
    {      
      icon: 'search',
      tooltip: '검색',
      callback: () => {
        this.searchExpand()
      }
    },
    {      
      icon: 'mdi-account',
      tooltip: '내 계정',
      callback: () => {
        console.log('account')
      }
    },
    {      
      icon: 'mdi-format-list-numbered',
      tooltip: '종목 순위',
      callback: () => {
        if(this.$route.fullPath !== '/trans') {
          this.$router.push('/')
        }
      }
    },
    {      
      icon: 'home',
      tooltip: '홈으로 가기',
      link: true,
      to:"/",
      callback: () => {
        if(this.$route.fullPath !== '/') {
          this.$router.push('/')          
        }        
      }
    },
  ]

  private search: any = null
  private items: Array<string> = []
  private loading = false

  @Watch("search")
  public watchSearch(val: unknown) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }

  private querySelections(val: any) {
    let timeout=  0
    this.loading = true
    window.clearTimeout(timeout)
    setTimeout(() => {
      this.items = this.searchTable.map((s: StockSimpleModel) => s.title).filter(e => {
        return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
      })
      this.loading = false
    }, 500)
  }

  @StockStoreModule.Action('getStock')
  private getStock!: (name: string) => Promise<void>

  private dialog = false
  private expand = false
  private darkMode = false

  private push(item: string) {
    this.search = null
    this.searchExpand();

    this.getStock(item).then(() => {
      this.$router.push(`/detail/${item}`)
    });    
    (document.activeElement as HTMLElement).blur()
      
  }
  private toggleDarkMode() {    
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    this.darkMode = !this.darkMode        
  }

  private searchExpand () {
    this.expand = !this.expand
  }

  get switchLabel () {
    return this.darkMode ? 'light' : 'dark'
  }
  
}
</script>