<template>
  <v-navigation-drawer
    expand-on-hover
  >
    <v-list
      v-if="loaded"
      nav
      dense
    >
      <v-list-item         
        
      link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>관심종목</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const InterestStoreModule = namespace('InterestStore')

@Component
export default class SideNav extends Vue {
  
  //state
  @InterestStoreModule.State('loaded')
  private loaded!: boolean

  @InterestStoreModule.State('interestGroups')
  private interestGroups!: string[]

  @InterestStoreModule.Mutation('initGroups')
  private readonly initGroups!: () => void

  created () {
    this.initGroups()
  }
}
</script>