<template>
  <v-row>
    <v-col cols="12" xl="10">      
      <market />        
    </v-col>

    <v-col cols="12" xl="2">      
      <menu-bar />   
      <side-bar />
      <simple-rank />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import SideBar from '@/v2/pages/SideBar.vue'
import Market from '@/v2/components/home/Market.vue'
import MenuBar from '@/v2/pages/MenuBar.vue'
import SimpleRank from '@/v2/pages/SimpleRank.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    SideBar,
    Market,
    MenuBar,
    SimpleRank
  }
})
export default class HomeV2 extends Vue {

  @StockStoreModule.Action('')


  created () {
    console.log(this.$vuetify.theme.themes.dark)
  }
}
</script>