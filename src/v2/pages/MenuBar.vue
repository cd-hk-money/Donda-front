<template>
  <div class="mr-10">
    <v-card           
      width="100%"
      class="d-flex justify-space-between mt-5 mr-5"        
      rounded="xl"
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
    
    <v-expand-transition>
      <v-card   
        class="mt-2"
        v-show="expand"
        width="256"
        height="100"
        rounded="xl"
      >
        검색바 on
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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

  private menus: Array<IMenu> = [    
    {      
      icon: 'search',
      tooltip: '검색',
      callback: () => {
        this.searchExpand()
      }
    },
    {      
      icon: 'mdi-account',
      tooltip: '내 계정',
      callback: () => {
        console.log('account')
      }
    },
    {      
      icon: 'mdi-format-list-numbered',
      tooltip: '종목 순위',
      callback: () => {
        if(this.$route.fullPath !== '/trans') {
          this.$router.push('/trans')
        }
      }
    },
    {      
      icon: 'home',
      tooltip: '홈으로 가기',
      link: true,
      to:"/v2",
      callback: () => {
        if(this.$route.fullPath !== '/v2') {
          this.$router.push('/v2')          
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