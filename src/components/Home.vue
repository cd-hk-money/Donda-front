<template>
  <v-container>
    <v-row >    
      <v-col            
        cols="12"
        sm="2"            
      >        
        <side-bar />             
      </v-col>          
      <!-- 메인 컨텐츠 영역 -->
      <v-col   
        class="main-content"
        cols="12"
        sm="8"
      >       
        <v-sheet
          class="grey darken-2"
          min-height="800px"
          rounded="xl"      
          absolute
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
import Market from './layout/Market.vue'
import AppBar from './layout/AppBar.vue'
import Navbar from './layout/NavBar.vue'
import SideBar from './layout/SideBar.vue'
import Recommend from './layout/Recommend.vue'

@Component({
  components: {
    AppBar,
    Navbar,
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
