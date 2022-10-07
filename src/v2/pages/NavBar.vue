<template>
  <div class="app-bar">
    <v-app-bar      
      dense
      dark
      app
      height="60px"
    >      
      <v-app-bar-nav-icon @click="pushLink('/')" class="navbar__icon">
        <v-icon>home</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title @click="pushLink('/')" class="ml-5 navbar__title">DONDA</v-toolbar-title>

      <div v-if="!mobile">
        <v-carousel        
          hide-delimiter-background             
          hide-delimiters
          vertical hide cycle
          :show-arrows="false"
          height="50px" width="auto" class="ml-15"                                         
        >
          <v-carousel-item
            class="navbar__carousel__itme"
            v-for="(carouselContent, i) in carouselContents"          
            :key="i"
          >
            <v-card 
              @click="pushLink(`/detail/${carouselContent.code}`)"                        
              width="400" height="66%" class="navbar__carousel__card"
            >
              <span class="text-h7"> {{ carouselContent.title }} </span>            
              <span class="navbar__carousel__card__code"> {{ carouselContent.code }} </span>            

              <v-divider vertical inset class="ml-1 mr-1"/>

              <span class="ml-1"> {{ carouselContent.close.toLocaleString() }}₩</span>
              <span :class="carouselChangesClass(carouselContent.changes)">
                {{ addPreFixer(carouselContent.changes) }}₩
                <span class="ml-1">
                  ({{ addPreFixer(carouselContent.changes_ratio) }}%)
                </span>
              </span>              
            </v-card>
          </v-carousel-item>          
        </v-carousel>            
      </div>
      
      <v-spacer />

      <v-autocomplete                   
        v-if="isSearch"        
        class="navbar__autocomplete"        
        v-model="searchs"            
        :items="items"
        :search-input.sync="search"
        color="black"          
        autofocus
        rounded
        hide-details
        hide-no-data
        solo-inverted
        cache-items   
        validate-on-blur
        item-text="name"
        item-value="id"
        @blur="isSearch = false"
        @keypress.enter="pushDetail(search)"
        @keydown.esc="isSearch = false"
      >
        <template v-slot:item="{ item }">        
          <v-list-item-content>
            <v-list-item-title v-text="item" />
            <v-list-item-subtitle v-text="codeTitleMapping[item][0]" />
          </v-list-item-content>
        </template>
      </v-autocomplete>    
            
      <div class="d-flex navbar__menu__btn" @click="isSearch = !isSearch">
        <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
        <div class="navbar__menu__btn__text">            
          Search
        </div>    
      </div>

      <div class="d-flex navbar__menu__btn" @click="pushLink('/rank')">
        <v-btn icon>
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>
        <div class="navbar__menu__btn__text">            
          Ranking
        </div>    
      </div>

      <v-divider vertical inset class="mr-1" />
        
      <v-menu
        right bottom        
        :position-y="100"            
        offset-y
        v-model="bookmark"        
        :min-width="250"
        :close-on-content-click="false"                
      >
        <template v-slot:activator="{ on, attrs}">
          <div class="d-flex navbar__menu__btn">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>                      
            <div class="navbar__menu__btn__text" v-bind="attrs" v-on="on">            
              Account
            </div>            
          </div>
        </template>
        
        <v-card v-if="logined">
          <v-list>
            <v-list-item>            
              <v-list-item-content>
                <v-list-item-title v-text="'이준하'" />
                <v-list-item-subtitle v-text="'ruddud1123@naver.com'" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn outlined @click="[bookmark = false, logined = false]">Logout</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch />
              </v-list-item-action>
              <v-list-item-title v-text="'모든 알림 끄기'" />
            </v-list-item>          
          </v-list>
        </v-card>

        <v-card v-else>
          <v-card-title class="text-h6 d-flex justify-center">LOGIN</v-card-title>                  

          <v-divider />
          
          <v-card-text>
            <v-text-field outlined label="ID" v-model="userId" />
            <v-text-field
              outlined label="PASSWORD"               
              :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="userPassword"
            />          
            <v-btn block outlined elevation="0"> Login </v-btn>            
            <v-btn class="mt-2" block outlined elevation="0"> Sign in </v-btn>            
          </v-card-text>
        </v-card>
      </v-menu>

      <v-menu
        right bottom offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on , attrs}">
          <div class="d-flex navbar__menu__btn">
            <v-btn icon v-on="on" v-bind="attrs" >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <div class="navbar__menu__btn__text" v-bind="attrs" v-on="on">            
              Bookmark
            </div>     
          </div>
        </template>

        <v-card min-width="350">
          <div class="d-flex justify-space-between">
            <span class="ml-4 pt-2 pb-2 font-weight-bold">내 관심종목 그룹</span>          
          </div>

          <v-divider />

          <v-list v-for="(item, i) in computedInterestStore" :key="i">
            <v-list-group         
              active-class="white--text text--darken-1 font-weight-bold"  
              :value="true"                      
              :append-icon="groupIcon"
              @contextmenu.prevent="[
                removeDialog = true,
                dialogTitle = item.title
              ]"
            >
              <template v-slot:activator>
                <v-list-item-content>              
                  <v-list-item-title v-text="item.title" />
                  <div v-if="groupIcon === ''">          
                    <v-icon>mdi-delete</v-icon>                      
                  </div>
                </v-list-item-content>
              </template> 
    
              <v-list-item
                class="interest-item"
                v-for="(child, i) in item.items" :key="i"                
              >
                <v-list-item-content class="interest-item-content" @click.left="pushDetail(child.title)">              
                  <v-list-item-title v-text="child.title" />
                  <v-list-item-subtitle v-text="child.subtitle" />
                </v-list-item-content>
    
                <v-list-item-action class="v-list-item-action-close">
                  <div class="d-flex">
                    <v-btn 
                      @click="setUserInterestAlarm(child.subtitle)"
                      class="mr-4" small icon                                       
                    >
                      <v-icon>{{ isAlarmed(child.subtitle) ? 'mdi-alarm-light' : 'mdi-alarm-light-outline' }}</v-icon>
                    </v-btn>
                    <v-btn 
                      @click="removeInterestGroupItem({
                        groupTitle: item.title,
                        itemTitle: child.title
                      })"
                      small icon                      
                    >
                      <v-icon>fa-regular fa-x</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>                    
              </v-list-item>           
            </v-list-group>
          </v-list>  

          <v-btn v-if="!addGroupDialog" block @click="addGroupDialog = true">
            관심종목 그룹 추가
            <v-icon>mdi-plus</v-icon>
          </v-btn>  
          
          <v-text-field 
            v-else 
            class="ml-3 mr-3"
            label="관심종목 그룹명"
            v-model="groupName"
            outlined autofocus clearable
            @blur="addGroupDialog = false" 
            @keydown.enter="[
              addGroup({
                title: groupName,
                item: []
              }), 
              updateState({
                snackBarMessage: '관심종목 그룹 추가 완료',
                snackBar: true
              }),
              groupName = ''
            ]"
          />
          
          <v-divider />
        </v-card>
      </v-menu>

      <v-menu 
        left bottom offset-y        
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex navbar__menu__btn">
            <v-btn icon v-on="on" v-bind="attrs" @click="isAlarm = false">       
              <v-badge v-if="isAlarm" color="error" overlap dot>
                <v-icon>mdi-alarm-light</v-icon>
              </v-badge> 
              <v-icon v-else>mdi-alarm-light</v-icon>
            </v-btn>            
            <div class="navbar__menu__btn__text" v-bind="attrs" v-on="on">            
              Alarm
            </div>  
          </div> 
        </template>
        
        <v-card min-width="350">
          <div class="d-flex justify-space-between">
            <span class="ml-4 pt-2 pb-2">알림</span>
            <v-btn
              @click="alramItems = []" 
              class="mr-4 pt-2 pb-2" icon              
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </div>

          <v-divider />

          <v-list>
            <v-list-item 
              class="navbar__list__item"
              v-for="(alram, i) in alramItems" :key="i"
              @click="[  
                alramItems.splice(i, 1),                          
                pushLink(`/detail/${codeTitleMapping[alram.title]}`)
              ]"                                      
            >
              <v-list-item-content>                
                <span>
                  {{ alram.title }}
                </span>
                <v-list-item-subtitle>
                  {{ alramTypeObj[alram.type] }}
                </v-list-item-subtitle>                
              </v-list-item-content>

              <v-list-item-action>
                <div v-if="alram.rate" :class="alram.rate > 0 ? 'red--text' : 'blue--text'">
                  <span class="alram-type">
                    {{ alramTypeObj[alram.type].split(' ')[0] }}
                  </span>
                  <span>
                    {{ alram.origin.toLocaleString() }}₩
                  </span>
                  <span class="alram-value mr-1">
                    {{ alram.value - alram.origin > 0 ? '+' : '' }}{{ alram.value - alram.origin }} ₩
                    ({{ alram.rate > 0 ? '+' : '' }}{{ alram.rate }} %)
                  </span>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>          
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { IUserAlram, IUserInterestGroupItem } from '@/models/interest'
import { IUpdateStateModel } from '@/models/payload'
import { IStockModel, StockSimpleModel } from '@/models/stock'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const MarketStoreModule = namespace('MarketStore')
const StockStoreModule = namespace('StockStore')
const InterestStoreModule = namespace('InterestStore')

@Component({
  
})
export default class NavBar extends Vue {

  alramTypeObj = {
    'close': '종가 변동',
    'volume': '거래량 변동'
  }

  @MarketStoreModule.State('codeTitleMapping') codeTitleMapping!: any
  @MarketStoreModule.State('searchTable') searchTable!: StockSimpleModel[]
  
  @InterestStoreModule.State('userInterests') userInterests!: IUserInterestGroupItem[]
  @InterestStoreModule.Mutation('addGroup') readonly addGroup!: (group: any) => void
  @InterestStoreModule.Mutation('updateState') readonly updateState!: (payload: IUpdateStateModel) => void
  @InterestStoreModule.Mutation('setUserInterestAlarm') setUserInterestAlarm!: (code: string) => void
  @InterestStoreModule.Mutation('removeInterestGroupItem') readonly removeInterestGroupItem!: ({groupTitle, itemTitle}: {groupTitle: string, itemTitle: string}) => void  
  @InterestStoreModule.Getter('computedInterestStore') computedInterestStore!: any
  
  @StockStoreModule.Action('getStock') getStock!: (name: string) => Promise<void>
  @StockStoreModule.Action('getDailySimpleRanks') getDailySimpleRanks!: () => Promise<void>
  @StockStoreModule.State('dailySimpleRanksLoaded') dailySimpleRanksLoaded!: boolean
  @StockStoreModule.State('dailySimpleRanks') dailySimpleRank!: any

  
  bookmark: boolean | null = false
  isAlarm: boolean | null = true
  isSearch: boolean | null = false
  logined = true
  loading = false
  searchs = ''
  search: any = null
  items: string[] = []

  userId: string | null = ''
  userPassword: string | null = ''
  showPassword: boolean | null = false

  addGroupDialog = false
  groupName: string | null = ''
  groupIcon = 'mdi-chevron-down'
  removeDialog = false
  dialogTitle: string | null = ''

  accountExpand = false
  
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
    }
  ]

  get carouselContents(): IStockModel[] {
    return this.dailySimpleRank.marcap.slice(0, 10).map((stock: any) => ({
      code: stock[1],
      title: stock[2],
      close: stock[4],
      changes: stock[5],
      changes_ratio: stock[6]      
    }))    
  }

  get mobile() {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  carouselChangesClass = (changes: number): string => {
    if(!changes) return ''
    return changes > 0 ? 'red--text' : 'blue--text'
  }

  addPreFixer = (value: number): string => value > 0 ? '+' + value.toLocaleString() :value.toLocaleString() 

  pushLink(link: string) {
    if(this.$route.fullPath !== link) this.$router.push(link)
  }

  pushDetail(item) {
    this.isSearch = false
    if(this.$route.fullPath === item) return

    this.getStock(item).then(() => {
      this.$router.push(`/detail/${this.codeTitleMapping[item]}`)
    });    
    (document.activeElement as HTMLElement).blur()      
  }

  isAlarmed (code: string): boolean {        
    return this.userInterests
                .find((interest: IUserInterestGroupItem) => code === interest.code)
                ?.alarm || false
  }

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

  async mounted() {
    await this.getDailySimpleRanks()
  }

}

  
</script>

<style scoped>

.navbar__autocomplete {
  max-width: 400px;  
  min-width: 168px;

  margin-right: 15px;
  overflow: visible;
}

.navbar__title,
.navbar__icon {
  cursor: pointer;
  font-weight: bold;
  /* font-size: 30px; */
}



.navbar__carousel {
  left: 200px;
  text-align: center;
}

.navbar__carousel__card {
  top: 10px;  
  display: flex;
  align-items: end;  
  gap: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
}

.navbar__carousel__card__code {
  font-size: 14px;
  display: block;
  opacity: .8;
}

.navbar__list__item {
  font-size: 15px;
}

.navbar__alarm__list__action {
  position: absolute;
  right: 5px;
}

.navbar__menu__btn {    
  text-align: center;      
  width: 50px;
  transition: all .2s ease-in-out;
}

.navbar__menu__btn__text {
  display: none;  
  overflow: hidden;
  white-space: nowrap;
}

.navbar__menu__btn:hover {
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar__menu__btn:hover .navbar__menu__btn__text {  
  width: auto;    
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.disable {
  display: none;
}

.interest-item-content {
  cursor: pointer;
}

@media screen and (min-width: 959) {
  .navbar__carousel {
    display: none !important;
  }

  .navbar__autocomplete {
    max-width: 600px;  
    margin-right: 15px;
    overflow: visible;
  }
}

</style>