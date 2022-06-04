<template>
  <div class="mr-10">
    <v-navigation-drawer        
      :class="[mobile ? '' : 'ml-5 mt-5']"
      bottom         
      permanent
      :fixed="mobile"
      :width="mobile ? '100%' : '110%'"
      :height="mobile ? '72' : '110%'"
    >
      <v-card       
        width="100%"
        class="d-flex justify-space-between mr-5"        
        outlined
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
      <v-card height="50" v-if="!logined" outlined elevation="0" class="text-center">
        <div class=text-h5>
          환영합니다.
        </div>
      </v-card>
      
      <v-expand-transition>
        <v-card   
          v-show="expand"
          width="100%"
          height="80"
          elevation="0"
        >
          <v-card-text>
            <v-autocomplete    
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

    </v-navigation-drawer>
    <v-dialog v-model="loginDialog" height="300" width="300">
      <v-card height="350" width="300" opacity-100>
        <v-card-title class="text-h5">
          LOGIN
        </v-card-title>        

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <v-text-field outlined label="ID" />
          <v-text-field outlined label="PASSWORD" />
          <v-btn block outlined elevation="0"> 로그인 </v-btn>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">

import { StockSimpleModel } from '@/models/stock'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

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

  menus: IMenu[] = [    
    {      
      icon: 'search',
      tooltip: '검색',
      callback: () => {
        this.expandState('expand')
      }
    },
    {      
      icon: 'mdi-account',
      tooltip: '내 계정',
      callback: () => {
        this.expandState('loginDialog')
      }
    },
    {      
      icon: 'mdi-format-list-numbered',
      tooltip: '종목 순위',
      callback: () => {
        if(this.$route.fullPath !== '/rank') {
          this.$router.push('/rank')
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

  searchs = ''
  search: any = null
  items: string[] = []
  loading = false
  dialog = false
  loginDialog = false
  expand = false
  darkMode = false
  logined = true

  get switchLabel () {
    return this.darkMode ? 'light' : 'dark'
  }

  get mobile () {
    return mobileHeight(this.$vuetify.breakpoint.name) < 500
  }

  @MarketStoreModule.State('searchTable')
  searchTable!: StockSimpleModel[]

  @StockStoreModule.Action('getStock')
  getStock!: (name: string) => Promise<void>

  @Watch("search")
  watchSearch(val: unknown) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }  


  querySelections(val: any) {
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

  toggleDarkMode() {    
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    this.darkMode = !this.darkMode        
  }

  searchExpand () {
    this.expand = !this.expand
  }  

  expandState(state: string) {
    this[state] = !this[state]
    console.log(this[state])
  }

  push(item: string) {
    this.search = null
    this.expandState('expand')

    this.getStock(item).then(() => {
      this.$router.push(`/detail/${item}`)
    });    
    (document.activeElement as HTMLElement).blur()      
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
}
</style>