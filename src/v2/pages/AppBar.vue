<template>
  <v-app-bar    
    elevation="0"
    app    
    dark
    absolute
  >    
    <v-tabs
      exact
      fixed-tabs
      centered
      class="ml-n9"
    >
      <v-tab
        v-for="link in links"
        :key="link.title"        
        :to="link.route"    
        replace
        active
        exact
      >        
        {{ link.title }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// models
import { RouteModel } from '@/models/app'

@Component
export default class AppBar extends Vue {

  links: RouteModel[] = [
    {
      title: '오늘의 주식 시장',
      route: '/'
    },
    {
      title: '상위 종목',
      route: '/trans'
    },    
    {
      title: '상위 종목 v2',
      route: '/rank'
    }
  ]

  push(link: RouteModel): void {    
    this.$router.push(link.route)
  }
}
</script>
