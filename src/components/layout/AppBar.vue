<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <v-avatar
      :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
      size="32"
    ></v-avatar>

    <v-tabs
      fixed-tabs
      centered
      center-active
      class="ml-n9"
    >
      <v-tab
        v-for="link in links"
        :key="link.title"
        @click="push(link)"
      >        
        {{ link.title }}
      </v-tab>
    </v-tabs>

    <v-avatar
      class="hidden-sm-and-down"
      color="grey darken-1 shrink"
      size="32"
    ></v-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RouteModel } from '@/models/app'

@Component
export default class AppBar extends Vue {
  private links: Array<RouteModel> = [
      {
        title: '오늘의 주식 시장',
        route: '/'
      },
      {
        title: '변동률 TOP 10',
        route: '/trans'
      },
      {
        title: '거래대금 TOP 10',
        route: '/change'
      }
    ]
  private push(link: RouteModel): void {
    this.$router.push(link.route)
  }
}
</script>
