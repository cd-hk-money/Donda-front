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
        class="main-content"
        cols="12"
        sm="8"
      >       
        <v-sheet
          class="grey darken-2"
          min-height="800px"
          rounded="xl"      
        >       
          <market />                                
          <recommend />
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
import { Component, Vue } from 'vue-property-decorator'

import SideBar from '@/components/layout/SideBar.vue'
import Market from '@/components/layout/Market.vue'
import Recommend from '@/components/layout/Recommend.vue'

@Component({
  components: {
    SideBar,
    Market,
    Recommend
  }
})
export default class Home extends Vue {  

}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>
