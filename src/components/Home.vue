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
          <!-- 메인 컨텐츠 영역 -->
          <v-col                      
            cols="12"
            sm="8"
          >       
            <v-sheet
              class="grey darken-2"
              min-height="80vh"
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Market from './layout/Market.vue'
import AppBar from './layout/AppBar.vue'
import Navbar from './layout/NavBar.vue'
import Recommend from './layout/Recommend.vue'

@Component({
  components: {
    AppBar,
    Navbar,
    Market,
    Recommend
  }
})
export default class Home extends Vue {  
}
</script>
