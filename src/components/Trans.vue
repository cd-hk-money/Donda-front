<template>
  <v-app id="inspire">

    <v-main class="grey lighten-1">              
      <v-container>
        <v-row >
          <v-col            
            cols="12"
            sm="2"            
          >                    
            <nav-bar />
          </v-col>          
          <!-- 메인 컨텐츠 영역 -->
          <v-col                      
            cols="12"
            sm="8"
          >       
                  
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
import NavBar from '@/components/layout/NavBar.vue'

@Component({
  components: {
    NavBar
  }
})
export default class Trans extends Vue {
  
}
</script>