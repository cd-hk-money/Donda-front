<template>          
  <v-container>
    <v-row >
      <v-col            
        cols="12"
        sm="2"            
      >         
        <side-bar />           
      </v-col>                              
      <v-col                      
        cols="12"
        sm="8"
      >       
        <v-sheet
          class="grey darken-2"
          min-height="910px"
          rounded="xl"
        >            
          <trans-list /> 
        </v-sheet>               
      </v-col>        
      <v-col
        cols="12"
        sm="2"
      >        
      </v-col>          
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component,  Mixins } from 'vue-property-decorator'
import NavBar from '@/components/layout/NavBar.vue'
import SideBar from '@/components/layout/SideBar.vue'
import TransList from '@/components/layout/TransList.vue'
import { namespace } from 'vuex-class'

// mixins
import TopListMixin from '@/mixins/TopListMixin.vue'

// stores 
const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    NavBar,
    TransList,
    SideBar
  }
})
export default class Change extends Mixins(TopListMixin) {
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  private created () {
    console.log('todayMarket()')
  }
 
}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>