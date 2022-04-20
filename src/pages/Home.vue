<template>
  <v-container>
    <v-row >    
      <v-col            
        cols="12"
        sm="2"            
      ></v-col>          
      
      <v-col   
        class="main-content"
        cols="12"
        sm="8"
      >       
        <v-sheet
          class="grey darken-4"
          min-height="95vh"
          max-height="95vh"          
        >      
          <v-row>
            <v-col cols="12" xl="4">
              <home-list />
            </v-col>

            <v-col cols="12" xl="8">
              <market />                                
            </v-col>
          </v-row> 

          <recommend />
        </v-sheet>                     
      </v-col>        
      
      <v-col
        cols="12"
        sm="2"
      ></v-col>          
    </v-row>
    <error v-if="isError" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SideBar from '@/layout/SideBar.vue'
import Market from '@/layout/Market.vue'
import Recommend from '@/layout/Recommend.vue'
import HomeList from '@/layout/HomeList.vue'
import Error from '@/layout/Error.vue'

@Component({
  components: {
    SideBar,
    Market,
    Recommend,
    Error,
    HomeList
  }
})
export default class Home extends Vue { 
  private isError: boolean = this.$route.params.error === 'true'

  created() {
    this.$watch(() => this.$route.params, (error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.main-content {
  
}
</style>
