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
    <HomeCarousel v-if="!isMobile && !dailySimpleRanks.loading"/>
    
    <v-spacer />

    <!-- 검색창 -->
    <SearchBar 
      v-if="isSearch"
      @searchBarBlur="isSearch = false"
    />

    <!-- 우측 메뉴 -->
    <NavBarMenus 
      v-if="!isSearch"
      @toggleSearch="isSearch = !isSearch"
      @pushLink="pushLink"
    />              
  </v-app-bar>
</template>

<script lang="ts">
import { getStock } from '@/store/payload'
import { IUserInterestGroupItem } from '@/models/interest'
import { Component } from 'vue-property-decorator'

import { mixins } from 'vue-class-component'

import StoreMixin from '@/mixins/StoreMixin.vue'
import DiviceMixin from '@/mixins/DiviceMixin.vue'

import HomeCarousel from '@/v2/pages/HomeCarousel.vue'
import SearchBar from '@/v2/pages/SearchBar.vue'
import NavBarMenus from '@/v2/pages/NavBarMenus.vue'
import UserStoreMixin from '@/mixins/UserStoreMixin.vue'


@Component({
  components: {
    HomeCarousel,
    SearchBar,
    NavBarMenus
  }
})
export default class NavBar extends mixins(StoreMixin, DiviceMixin, UserStoreMixin) {

  isSearch: boolean | null = false

  pushLink(link: string) {
    if(this.$route.fullPath !== link) this.$router.push(link)
  }

  pushDetail(code: string) {
    this.isSearch = false
    if(this.$route.fullPath === code) return

    this.callRequest(getStock(code))    
    this.$router.push(`/detail/${this.codeTitleMapping[code]}`); 
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