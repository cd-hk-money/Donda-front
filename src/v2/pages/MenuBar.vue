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
          v-for="(menu, i) in menus"
          :key="i"
          bottom
        >
          <template v-slot:activator="{on, attrs }">
          <div v-if="i === 1">            
            <v-badge
              color="error"
              :content="badge"
              :value="badge"
              overlap
              offset-y="30"
            >
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
            </v-badge>
          </div>
          <div v-else>
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
          </div>
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
      <v-card height="350" width="300" opacity-100 elevation="">
        <v-card-title class="text-h5">
          LOGIN
        </v-card-title>        

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <v-text-field 
            outlined 
            label="ID"
            v-model="id" />
          <v-text-field
            outlined 
            label="PASSWORD" 
            :append-icon="passwordShow? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
            v-model="password" />
          <v-btn 
            block 
            outlined 
            elevation="0"
            @click="tryLogin"
          > 로그인 
          </v-btn>
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
import { IUserAccount } from '@/models/user'
import { IUpdateStateModel } from '@/models/payload'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')
const UserStoreModule = namespace('UserStore')

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

  // 상단 메뉴
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
        this.updateState({
          badge: 0
        })
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

  // 검색창
  searchs = ''

  // 검색창 필터
  search: any = null

  // 연관 검색어들
  items: string[] = []

  // 검색창 로딩
  loading = false

  // 로그인 다이어로그
  loginDialog = false

  // 검색창 확장
  expand = false

  // 다크모드
  darkMode = false

  // 로그인 유무
  logined = true

  // 알림 뱃지 개수
  badge = 3

  // ID, PASSWORD
  id =''
  password = ''

  // PASSWORD 숨김 여부
  passwordShow = false

  // 다크모드 스위치
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

  @UserStoreModule.Action('tryLogin')
  login!: (payload: IUserAccount) => Promise<void>

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

  expandState(state: string) {
    this[state] = !this[state]
  }

  updateState(payload: IUpdateStateModel) {
    Object.entries(payload).forEach((state) => {
      this[state[0]] = state[1]
    })        
  }

  async tryLogin() {
    await this.login({
      id: this.id,
      password: this.password
    })
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