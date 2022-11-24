<template>
  <div class="d-flex">

    <!-- 검색창 -->
    <div 
      class="d-flex navbar__menu__btn" 
      @click="$emit('toggleSearch')"
    >
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <div class="navbar__menu__btn__text">            
        Search
      </div> 
    </div>


    <!-- 랭킹 -->
    <div 
      class="d-flex navbar__menu__btn" 
      @click="$emit('pushLink', '/rank')"
    >
      <v-btn icon>
        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn>
      <div class="navbar__menu__btn__text">            
        Ranking
      </div>    
    </div>


    <v-divider vertical inset class="mr-1" />


    <!-- 사용자 관리 -->
    <v-menu
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
              <v-btn outlined @click="[tryLogout(), bookmark = false]">로그아웃</v-btn>
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
          <v-btn block outlined elevation="0" @click="[tryLogout(), bookmark = false]"> 로그인 </v-btn>            
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


    <!-- 관심종목 관리 -->
    <v-menu
      right 
      bottom 
      offset-y
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
            append-icon='mdi-chevron-down'
            @contextmenu.prevent="dialogTitle = item.title"
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
              <v-list-item-content class="interest-item-content" @click.left="$emit('pushDetail',child.title)">              
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


    <!-- 알람 -->
    <v-menu 
      left 
      bottom 
      offset-y        
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
              $emit('pushLink', `/detail/${codeTitleMapping[alram.title]}`)                      
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


  </div>
</template>

<script lang="ts">
  import StoreMixin from '@/mixins/StoreMixin.vue';
  import UserStoreMixin from '@/mixins/UserStoreMixin.vue';
  import { IUserAlram, IUserInterestGroupItem } from '@/models/interest';
  import { mixins } from 'vue-class-component';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class NavBarMenus extends mixins(UserStoreMixin, StoreMixin) {


    bookmark: boolean | null = false   

    // 로그인 폼
    loginUsername = ''
    loginPassword = ''    
    showPassword: boolean | null = false

    // 회원가입 폼
    isSignUp = false
    valid = true
    email = ''
    username = ''
    nickname = ''
    password = ''

    // 회원가입 검증
    usernameRules = [
      (v: string) => !!v || '사용자이름은 필수 입력 사항입니다.',
      (v: string) => (v && v.length <= 20) || '20글자보다 작아야 합니다.',
      (v: string) => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')
    ]

    passwordRules = [
      (v: string) => !!v || '비밀번호는 필수 입력 사항입니다.', 
      (v: string) => (v && v.length <= 20) || '20글자보다 작아야 합니다.', 
      (v: string) => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')
    ]
    emailRules = [
      (v: string) => !!v || '이메일은 필수 입력 사항입니다.', 
      (v: string) => /.+@.+\..+/.test(v) || '올바르지않은 이메일 형식입니다.', 
      (v: string) => (v && !v.match(/[\s]/g) || '공백이 있으면 안됩니다.')
    ]

    // 관심종목 
    dialogTitle: string | null = ''    
    isAlarm: boolean | null = true
    groupIcon = 'mdi-chevron-down'
    addGroupDialog = false
    groupName: string | null = ''

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

    alramTypeObj = {
      'close': '종가 변동',
      'volume': '거래량 변동'
    }

    validate (): boolean {
      const valid = (this.$refs.form as NavBarMenus).validate()
      if(!valid) return valid
      else {
        this.signUp()
      }
      return valid        
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

    async signUp() {
      await this.trySignUp({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        email: this.email
      })

      const { error, data} = this.signUpState

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

    isAlarmed (code: string): boolean {        
      return this.userInterests
                  .find((interest: IUserInterestGroupItem) => code === interest.code)
                  ?.alarm || false
    }
  }
</script>

<style scoped>
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
</style>