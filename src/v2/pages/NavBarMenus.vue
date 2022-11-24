<template>
  <div class="d-flex">

    <!--  검색창 버튼-->
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


    <!-- 랭킹 버튼 -->
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


    <!-- 사용자 관리 버튼 -->
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



  </div>
</template>

<script lang="ts">
  import UserStoreMixin from '@/mixins/UserStoreMixin.vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class NavBarMenus extends UserStoreMixin {
    bookmark: boolean | null = false   

    // 로그인 변수
    loginUsername = ''
    loginPassword = ''

    userPassword: string | null = ''
    showPassword: boolean | null = false

    // 회원가입 변수
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
      const valid = (this.$refs.form as NavBarMenus).validate()
      if(!valid) return valid
      else {
        this.signUp()
      }
      return valid        
    }

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