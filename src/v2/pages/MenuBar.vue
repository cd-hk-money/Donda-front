<template>
  <div class="mr-4">
    <v-navigation-drawer        
      :class="[mobile ? '' : 'ml-8 mt-5']"      
      permanent                  
      :fixed="mobile"
      :width="mobile ? '100%' : '350'"      
      min-width="120%"
      max-height="80"      
      height="auto"
      :mini-variant.sync="mini"
    >      
      <v-card                               
        elevation="0"
        class="d-flex justify-space-between align-center"        
        height="60"  
        max-height="80"      
        outlined
      >      
        <v-btn 
          v-show="!mobile"
          @click.stop="[
            mini = !mini,
            expand = false,
            userExpand = false,
            alramConfig = false ,
            alramCheck = false
          ]"
          elevation="0"
          icon                 
          class="ml-2"
        >
          <v-icon>
            {{ btnIcon }}
          </v-icon>
        </v-btn>

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
                offset-y="20"
              >
                <v-btn          
                  class="ml-1"
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
                class="ml-1"
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
          class="ml-2"      
          inset
        ></v-switch>
      </v-card>  
          
      <v-expand-transition>
        <v-card             
          v-show="expand"
          width="100%"
          max-height="80"
          elevation="0"
          outlined
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
          v-if="logined && userExpand"          
          max-width="100%"          
          elevation="0"          
        >
          <div class="d-flex">
            <v-btn 
              v-for="(menu, i) in userMenu"              
              :key="i"
              :class="menu.enable ? 'userMenu-active' : ''"       
              elevation="0"       
              width="33%"              
              @click="[
                menu.callback(),
                userMenu.forEach(menu => menu.enable = false),
                menu.enable = true                
              ]"
            >
              {{ menu.title }}
            </v-btn>
          </div>
          
          <v-divider></v-divider>

        </v-card>
      </v-expand-transition>
        
      <v-expand-transition>
        <v-card          
          v-show="alramConfig"
          width="100%"          
          max-height="auto"
          elevation="0"
          outlined
        >
          <v-list subheader two-line>
            <v-list-item
              v-for="(list, i) in userInterests"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="list.title"></v-list-item-title>

                <v-list-item-subtitle v-text="list.code"></v-list-item-subtitle>                
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="changeUserInterestAlram(i)">
                  <v-icon>
                    {{ list.alarm ? 'mdi-alarm-light' : 'mdi-alarm-light-outline'}}
                  </v-icon>
                </v-btn>
            
              </v-list-item-action>              
            </v-list-item>               
          </v-list>
        </v-card>
            
      </v-expand-transition>

      <v-expand-transition>
        <v-card                  
          v-show="alramCheck && logined && alramItems.length !== 0"                             
          height="auto"
          elevation="0"
          outlined          
        >
            <v-list subheader two-line v-show="alramCheck && logined && alramItems.length !== 0">            
              <transition-group name="slide">
                <v-list-item 
                  v-for="(alram, i) in alramItems" :key="i"
                  @click.left="[
                    alramItems.splice(i, 1),
                    $router.push(`/detail/${store.codeTitleMapping[alram.title]}`)
                  ]"                       
                  @contextmenu.prevent="alramItems.splice(i, 1)"             
                >
                  <v-list-item-content>                
                    <span>
                      {{ alram.title}}
                    </span>
                    <v-list-item-subtitle>
                      {{ alramTypeObj[alram.type] }}
                    </v-list-item-subtitle>                
                  </v-list-item-content>

                  <v-list-item-action >
                    <div v-if="alram.rate" :class="alram.rate > 0 ? 'red--text' : 'blue--text'">
                      <span class="alram-type">
                        {{alramTypeObj[alram.type].split(' ')[0]}}
                      </span>
                      <span>
                        {{ alram.origin.toLocaleString() }}₩
                      </span>
                      <span class="alram-value mr-1">
                        {{ alram.value - alram.origin > 0 ? '+' : ''  }}{{ alram.value - alram.origin }}₩
                        ({{ alram.rate > 0 ? '+' : '' }}{{ alram.rate }} %)
                      </span>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </transition-group>
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
    <side-bar v-if="!mini" :class="[mobile ? '' : 'ml-8 mt-5']"  />
  </div>
</template>

<script lang="ts">

import { StockSimpleModel } from '@/models/stock'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'
import { IUserAccount } from '@/models/user'
import { IUpdateStateModel } from '@/models/payload'
import { IInterestGroup, IInterestGroupItem, InterestGroupModel, IUserAlram, IUserInterestGroupItem } from '@/models/interest'
import SideBar from '@/v2/pages/SideBar.vue'
import StoreMixin from '@/mixins/StoreMixin.vue'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')
const UserStoreModule = namespace('UserStore')
const InterestStoreModule = namespace('InterestStore')
const store: StoreMixin = new StoreMixin()

export interface IMenu {
  icon?: string,
  tooltip?: string,
  color?: string
  link?: boolean 
  to?: string 
  callback?(): boolean | any ,
  tile?: boolean 
  enable?: boolean
  title?: string 
}

@Component({
  components: {
    SideBar
  }
})
export default class MenuBar extends Vue {

  store: StoreMixin = new StoreMixin()

  alramTypeObj = {
    'close': '종가 변동',
    'volume': '거래량 변동'
  }

  userMenu: IMenu[] = [
    {
      title: '로그아웃',
      callback: () => {
        this.expandState('logined')
        this.updateData({ alramConfig: false, alramCheck: false })
      }      
    },
    {
      title: '알림 확인',      
      enable: false,
      callback: () => {        
        this.expandState('alramCheck')
        this.updateData({ alramConfig: false })        
      }
    },
    {
      title: '알림 설정',
      enable: false,
      callback: () => {
        this.expandState('alramConfig')
        this.updateData({ alramCheck: false })
      }
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
        this.expandState('loginDialog')
        this.expandState('userExpand')        
        this.expandState('alramCheck')
        this.getState('alramCheck') ? this.updateData({alramCheck: false}) : this.updateData({alramCheck: true})
        this.updateData({alramConfig: false})        
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


  getAlramItems = () => this.alramItems
  alramItems: IUserAlram[] = [
    {
      title: '유니트론텍',
      type: 'close',      
      origin: 1600,
      value: 2000,
      rate: 30
    },
    {
      title: '휴젤',
      type: 'volume',
      origin: 9000,
      value: 5000,
      rate: -40
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
  getAlramconfig = () => this.alramConfig

  // 알림 확인 확장
  alramCheck = false

  // 다크모드
  darkMode = false

  // 로그인 유무
  logined = true

  // 알림 뱃지 개수  
  get badge () {
    return this.alramItems.length
  }


  // ID, PASSWORD
  id =''
  password = ''

  // PASSWORD 숨김 여부
  passwordShow = false
  
  // 
  mini = true

  // 다크모드 스위치
  get switchLabel () {
    return this.darkMode ? 'light' : 'dark'
  }

  // 메뉴 펼침 여부 버튼 아이콘
  get btnIcon () {
    return this.mini ? 'mdi-arrow-expand-right' : 'mdi-arrow-expand-left'
  }

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  @Watch('mobile')
  watchMobile(prev) {    
    if(this.mobile) this.mini = false
  }

  @Watch('$route', { immediate: true, deep: true })
   onUrlChange(newVal: any) {
    if(newVal.fullPath.includes('detail')) {
      setTimeout(() => {
        this.setState('mini', false)        
      }, 100)      
    }
    
  }


  @MarketStoreModule.State('searchTable') searchTable!: StockSimpleModel[]
  // @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any
  @UserStoreModule.Action('tryLogin') login!: (payload: IUserAccount) => Promise<void>
  @StockStoreModule.Action('getStock') getStock!: (name: string) => Promise<void>

  @InterestStoreModule.State('interestGroups') interestGroups!: IInterestGroup[]
  @InterestStoreModule.State('userInterests') userInterests!: IUserInterestGroupItem[]
  @InterestStoreModule.State('userInerestAlarms') userInerestAlarms!: () => void
  @InterestStoreModule.Mutation('userInterestUpdate') userInterestUpdate!: () => void
  @InterestStoreModule.Mutation('changeUserInterestAlram') changeUserInterestAlram!: (payload: number) => void
  @InterestStoreModule.Mutation('snackBarOpen') snackBarOpen!: (message: string) => void

  
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

  getState(state: string) {
    return this[state]
  }

  setState(state: string, value: any) {
    this[state] = value
  }

  updateData(payload: IUpdateStateModel) {
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
      this.$router.push(`/detail/${store.codeTitleMapping[item]}`)
    });    
    (document.activeElement as HTMLElement).blur()      
  }

  mounted () {    
    this.userInterestUpdate()    
    if(this.mobile) this.mini = false
  } 

}
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
}

.userMenu-active {
  background-color: white;
}

.alram-type {
  font-size: 14px;
}

.alram-value {
  font-size: 14px;
}



.slide-leave-active {
  position: absolute;
  width: 100%;
  animation: slide-out 0.4s ease-out forwards;
  transition: opacity 0.2s;
  opacity: 0;
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(350px);
  }
}

</style>