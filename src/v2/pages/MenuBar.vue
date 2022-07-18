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

      <v-expand-transition>
        <v-card
          v-if="logined"
          v-show="userExpand"
          width="100%"
          height="38"
          elevation="0"
          outlined
        >
          <div class="d-flex">
            <v-btn 
              elevation="0"
              width="33%"
              :key="i"
              v-for="(menu, i) in userMenu"
              @click="menu.callback"
            >
              {{ menu.title }}
            </v-btn>
          </div>
          
        <v-divider></v-divider>
          
          <!-- <v-list
            subheader
            two-line
          >
            <v-list-item
              v-for="(list, i) in userInterests"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="list.title"></v-list-item-title>

                <v-list-item-subtitle v-text="list.code"></v-list-item-subtitle>                
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="alramChange(i)">
                  <v-icon color="grey lighten-1">
                    {{ list.alarm ? 'mdi-alarm-light' : 'mdi-alarm-light-outline'}}
                  </v-icon>
                </v-btn>
            
              </v-list-item-action>              
            </v-list-item>               
          </v-list> -->
          

        </v-card>
      </v-expand-transition>
        
      <v-expand-transition>
        <v-card          
          v-show="alramConfig"
          width="100%"          
          height="300"
          elevation="0"
          outlined
        >
          <v-list
            subheader
            two-line
          >
            <v-list-item
              v-for="(list, i) in userInterests"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="list.title"></v-list-item-title>

                <v-list-item-subtitle v-text="list.code"></v-list-item-subtitle>                
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="alramChange(i)">
                  <v-icon color="grey lighten-1">
                    {{ list.alarm ? 'mdi-alarm-light' : 'mdi-alarm-light-outline'}}
                  </v-icon>
                </v-btn>
            
              </v-list-item-action>              
            </v-list-item>               
          </v-list>
        </v-card>
            
      </v-expand-transition>

    </v-navigation-drawer>
    <v-dialog v-model="loginDialog" height="300" width="300" v-if="!logined">
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
import { IInterestGroup, IInterestGroupItem, InterestGroupModel, IUserInterestGroupItem } from '@/models/interest'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')
const UserStoreModule = namespace('UserStore')
const InterestStoreModule = namespace('InterestStore')

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

  userMenu: IMenu[] = [
    {
      title: '로그아웃',
      callback: () => {
        this.expandState('logined')
        this.setState('alramConfig', false)
      }
    },
    {
      title: '알림 확인',
      callback: () => { null }
    },
    {
      title: '알림 설정',
      callback: () => this.expandState('alramConfig')
    }    
  ]

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
        this.expandState('userExpand')
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

  // 유저 정보 확장
  userExpand = false

  // 검색창 확장
  expand = false

  // 알림 설정 확장
  alramConfig = false

  // 다크모드
  darkMode = false

  // 로그인 유무
  logined = true

  // 알림 뱃지 개수
  badge = 10

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

  @InterestStoreModule.State('interestGroups')
  interestGroups!: IInterestGroup[]

  @InterestStoreModule.State('userInterests')
  userInterests!: IUserInterestGroupItem[]

  @InterestStoreModule.Mutation('userInterestUpdate')
  userInterestUpdate!: () => void

  @InterestStoreModule.State('userInerestAlarms')
  userInerestAlarms!: () =>void

  @InterestStoreModule.Mutation('changeUserInterestAlram')
  changeUserInterestAlram!: (payload: number) => void

  



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

  setState(state: string, value: any) {
    this[state] = value
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

  mounted () {    
    this.userInterestUpdate()    
  } 

  
  alramChange(i) {
    this.changeUserInterestAlram(i)
  } 




}
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
}
</style>