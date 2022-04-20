<template>
  <v-app-bar    
    elevation="0"
    app
    color="grey darken-4"
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

    <v-avatar
      class="hidden-sm-and-down"
      color="grey darken-1 shrink"
      size="auto"
    ></v-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// models
import { RouteModel } from '@/models/app'

@Component
export default class AppBar extends Vue {

  private links: Array<RouteModel> = [
    {
      title: '오늘의 주식 시장',
      route: '/'
    },
    {
      title: '상위 종목',
      route: '/trans'
    },    
  ]

  private push(link: RouteModel): void {    
    this.$router.push(link.route)
  }
}
</script>
