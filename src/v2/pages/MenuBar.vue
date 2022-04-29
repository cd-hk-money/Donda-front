<template>
  <div>
    <v-card           
      width="256"
      class="d-flex justify-left mt-5"        
    >
      <v-tooltip 
        v-for="menu in menus"
        :key="menu.icon"
        bottom
      >
        <template v-slot:activator="{on, attrs }">
          <v-btn          
            class="mt-2"
            v-on="on"
            v-bind="attrs"
            large
            icon                  
            @click="menu.click"            
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
        class="ml-5"      
        inset
      ></v-switch>
    </v-card>
    
    <v-expand-transition>
      <v-card   
        class="mt-2"
        v-show="expand"
        width="256"
        height="100"
      >
        검색바 on
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Imenu {
  icon: string,
  tooltip: string,
  click(): boolean | any
}

@Component
export default class MenuBar extends Vue {
  private menus: Array<Imenu> = [
    {      
      icon: 'home',
      tooltip: '홈으로 가기',
      click: () => {
        if(this.$route.fullPath !== '/v2') {
          this.$router.push('/v2')          
        }        
      }
    },
    {      
      icon: 'search',
      tooltip: '검색',
      click: () => {
        this.searchExpand()
      }
    },
    {      
      icon: 'mdi-account',
      tooltip: '내 계정',
      click: () => {
        console.log('account')
      }
    },
    {      
      icon: 'mdi-format-list-numbered',
      tooltip: '종목 순위',
      click: () => {
        if(this.$route.fullPath !== '/trans') {
          this.$router.push('/trans')
        }
      }
    },
  ]
  
  private expand = false
  private darkMode = false

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