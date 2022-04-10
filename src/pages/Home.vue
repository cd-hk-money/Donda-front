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
    <error v-if="isError" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SideBar from '@/layout/SideBar.vue'
import Market from '@/layout/Market.vue'
import Recommend from '@/layout/Recommend.vue'
import Error from '@/layout/Error.vue'

@Component({
  components: {
    SideBar,
    Market,
    Recommend,
    Error
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
  margin-top: 30px;
}
</style>
