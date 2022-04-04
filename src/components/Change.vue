<template>
  <v-app id="inspire">

    <v-main class="grey darken-4">              
      <v-container>
        <v-row >
          <v-col            
            cols="12"
            sm="2"            
          >                    
          </v-col>                              
          <v-col                      
            cols="12"
            sm="8"
          >       
            <v-sheet
              class="grey darken-2"
              min-height="80vh"
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component,  Mixins } from 'vue-property-decorator'
import NavBar from '@/components/layout/NavBar.vue'
import TransList from '@/components/layout/TransList.vue'
import { namespace } from 'vuex-class'

// mixins
import TopListMixin from '@/mixins/TopListMixin.vue'

// stores 
const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    NavBar,
    TransList
  }
})
export default class Change extends Mixins(TopListMixin) {
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.Action('todayMarket')
  private todayMarket!: () => void

  private created () {
    console.log('todayMarket()')
  }
 
}
</script>