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
          min-height="800px"
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
import { Component, Vue,  } from 'vue-property-decorator'
import SideBar from '@/layout/SideBar.vue'
import TransList from '@/layout/TransList.vue'

@Component({
  components: {
    SideBar,
    TransList
  }
})
export default class Trans extends Vue {

}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>