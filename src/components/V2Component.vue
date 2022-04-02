<template>
  <v-app id="inspire">

    <app-bar />
    <!-- main  -->
    <v-main class="grey lighten-1">              
      <v-container>
        <v-row >
          <v-col            
            cols="12"
            sm="2"            
          >                    
            <navbar />
          </v-col>          
          <!-- 메인 컨텐츠 영역 -->
          <market />

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

@Component({
  components: {
    AppBar,
    Navbar,
    Market
  }
})
export default class V2Component extends Vue {
  
}
</script>
