<template>
  <v-app-bar      
    dense
    dark
    app
    height="60px"
  >      

    <!-- 좌측 아이콘 -->
    <v-app-bar-nav-icon @click="pushLink('/')" class="navbar__icon">
      <v-icon>home</v-icon>
    </v-app-bar-nav-icon>

    <!-- 좌측 크로셀 -->
    <HomeCarousel v-if="!isMobile && !dailySimpleRanksLoaded"/>
    
    <v-spacer />

    <SearchBar 
      v-if="isSearch"
      @searchBarBlur="isSearch = false"
    />

    <div 
      v-if="!isSearch"
      class="d-flex navbar__menu__btn" @click="isSearch = !isSearch"
    >
      <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
      <div class="navbar__menu__btn__text">            
        Search
      </div>    
    </div>

    <div 
      v-if="!isSearch"
      class="d-flex navbar__menu__btn" @click="pushLink('/rank')"
    >
      <v-btn icon>
        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn>
      <div class="navbar__menu__btn__text">            
        Ranking
      </div>    
    </div>


    <v-divider vertical inset class="mr-1" />

      
    <v-menu
      v-if="!isSearch"
      right bottom        
      :position-y="100"            
      offset-y
      v-model="bookmark"
      :min-width="300"
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
      
      <v-card v-if="user && bookmark && !loginState.loading">
        <v-list>
          <v-list-item>            
            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }} </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn outlined @click="logout">로그아웃</v-btn>
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


      <v-card v-else-if="!isSignUp && bookmark">
        <v-card-title class="text-h6 d-flex justify-center">로그인</v-card-title>                  
        <v-divider />          
        <v-card-text>
          <v-form>
            <v-text-field 
              outlined 
              label="아이디"
              v-model="loginUsername" 
              color="cyan"
            />
            <v-text-field
              outlined 
              label="패스워드"               
              :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="loginPassword"
              @keypress.enter="login"
              color="cyan"
            />          
          </v-form>
          <v-btn block outlined elevation="0" @click="login"> 로그인 </v-btn>            
          <v-btn class="mt-2" block outlined elevation="0" @click="isSignUp = true"> 회원가입 </v-btn>    
        </v-card-text>
      </v-card>


      <v-card v-else-if="isSignUp && bookmark" >
        <v-card-title class="text-h6 d-flex justify-center">회원가입</v-card-title>                  
        <v-divider />          
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation v-if="!signUpState.loading">
            <v-text-field 
              v-model="username" 
              outlined 
              :not_space="true"
              :counter="20"
              label="사용자이름"
              :rules="usernameRules"
              required
              color="cyan"
            />                          
            <v-text-field 
              v-model="email"
              :not_space="true"
              :rules="emailRules"
              required                
              outlined 
              label="이메일"
              color="cyan"
            />
            <v-text-field 
              v-model="nickname"
              :counter="10"
              outlined 
              label="별명"
              color="cyan"
            />
            <v-text-field 
              outlined label="패스워드"        
              :not_space="true"       
              :rules="passwordRules"
              :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              required
              v-model="password" 
              :counter="20"
              color="cyan"
            />
            <v-btn block outlined elevation="0" @click="validate" :disalbed="!valid"> 회원 가입 </v-btn>            
            <v-btn color="error" class="mt-2" block outlined elevation="0" @click="isSignUp = false"> 취소 </v-btn>              
          </v-form>
          <div class="text-center stockinfo-progress-circular" v-else>
            <v-progress-circular indeterminate color="#00BCD4" />        
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    

    <v-menu
      v-if="!isSearch"
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
      v-if="!isSearch"
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
</template>

<script lang="ts">
import { getStock } from '@/store/payload'
import { IUserAlram, IUserInterestGroupItem } from '@/models/interest'
import { IUpdateStateModel } from '@/models/payload'
import { IStockModel, StockSimpleModel } from '@/models/stock'
import { Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { StoreState, User } from '@/store/UserStore'
import { mixins } from 'vue-class-component'

import StoreMixin from '@/mixins/StoreMixin.vue'
import DiviceMixin from '@/mixins/DiviceMixin.vue'

import HomeCarousel from '@/v2/pages/HomeCarousel.vue'
import SearchBar from '@/v2/pages/SearchBar.vue'


const InterestStoreModule = namespace('InterestStore')
const UserStoreModule = namespace('UserStore')


@Component({
  components: {
    HomeCarousel,
    SearchBar
  }
})
export default class NavBar extends mixins(StoreMixin, DiviceMixin) {

  alramTypeObj = {
    'close': '종가 변동',
    'volume': '거래량 변동'
  }
    
  @InterestStoreModule.State('userInterests') userInterests!: IUserInterestGroupItem[]
  @InterestStoreModule.Mutation('addGroup') readonly addGroup!: (group: any) => void
  @InterestStoreModule.Mutation('updateState') readonly updateState!: (payload: IUpdateStateModel) => void
  @InterestStoreModule.Mutation('setUserInterestAlarm') setUserInterestAlarm!: (code: string) => void
  @InterestStoreModule.Mutation('removeInterestGroupItem') readonly removeInterestGroupItem!: ({groupTitle, itemTitle}: {groupTitle: string, itemTitle: string}) => void  
  @InterestStoreModule.Getter('computedInterestStore') computedInterestStore!: any
      
  @UserStoreModule.State('signUpState') signUpState!: StoreState
  @UserStoreModule.State('loginState') loginState!: StoreState
  @UserStoreModule.State('user') user!: User
  @UserStoreModule.Mutation('updateState') readonly updateUserState!: (payload: IUpdateStateModel) => void

  @UserStoreModule.Action('trySignUp') trySignUp!: (payload: { username: string, nickname: string, email: string, password: string }) => Promise<void>
  @UserStoreModule.Action('tryLogin') tryLogin!: (paylaod: { username: string, password: string}) => Promise<void>
  @UserStoreModule.Action('tryLogout') tryLogout!: () => void
  
  bookmark: boolean | null = false    
  isAlarm: boolean | null = true
  isSearch: boolean | null = false
  loading = false
  searchs = ''
  search: any = null
  items: string[] = []


  // 로그인
  loginUsername = ''
  loginPassword = ''

  logout () {
    this.tryLogout()
    this.bookmark = false
  }

  async login () {
    await this.tryLogin({
      username: this.loginUsername,
      password: this.loginPassword
    })

    const { error, data} = this.loginState
    data as { accessToken: string, grantType: string, refreshToken: string, refreshTokenExpirationTime: number }
    if(error) {
      this.updateState({
        snackBarMessage: '로그인 실패: 잘못된 아이디와 비밀번호입니다.',
        snackBar: true        
      })
    }

    if(data) {
      this.bookmark = false
      this.updateState({
        snackBarMessage: `환영합니다! ${this.loginUsername}님`,
        snackBar: true        
      })
      this.loginPassword = ''
      this.loginUsername = ''
    }
  }


  // 회원가입
  isSignUp = false
  valid = true
  email = ''
  username = ''
  nickname = ''
  password = ''

  usernameRules = [v => !!v || '사용자이름은 필수 입력 사항입니다.', v => (v && v.length <= 20) || '20글자보다 작아야 합니다.' , v => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')]
  passwordRules = [v => !!v || '비밀번호는 필수 입력 사항입니다.', v => (v && v.length <= 20) || '20글자보다 작아야 합니다.', v => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')]
  emailRules = [v => !!v || '이메일은 필수 입력 사항입니다.', v => /.+@.+\..+/.test(v) || '올바르지않은 이메일 형식입니다.', v => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')]

  validate (): boolean {
    const valid = (this.$refs.form as NavBar).validate()
    if(!valid) return valid
    else {
      this.signUp()
    }
    return valid        
  }

  async signUp() {
    await this.trySignUp({
      username: this.username,
      password: this.password,
      nickname: this.nickname,
      email: this.email
    })

    const { loading, error, data} = this.signUpState

    if(error) {
      this.updateState({
        snackBarMessage: '회원가입 실패: 중복된 사용자 이름',
        snackBar: true
      })      
    }

    if(data) {
      this.updateState({
        snackBarMessage: '회원가입 성공',
        snackBar: true
      })      
      this.bookmark = false
      this.isSignUp = false
    }
  }

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
  
  
  pushLink(link: string) {
    if(this.$route.fullPath !== link) this.$router.push(link)
  }

  pushDetail(item) {
    this.isSearch = false
    if(this.$route.fullPath === item) return

    this.callRequest(getStock(item))    
    this.$router.push(`/detail/${this.codeTitleMapping[item]}`); 
    (document.activeElement as HTMLElement).blur()      
  }

  isAlarmed (code: string): boolean {        
    return this.userInterests
                .find((interest: IUserInterestGroupItem) => code === interest.code)
                ?.alarm || false
  }



  created () {
    const user = localStorage.getItem('user')
    if(user) {
      const userData = JSON.parse(user)
      this.updateUserState({ user: userData })

    }
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