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
import SideBar from '@/components/layout/SideBar.vue'
import TransList from '@/components/layout/TransList.vue'

@Component({
  components: {
    SideBar,
    TransList
  }
})
export default class Trans extends Vue {
  private clickList(): void {
      
  }

  private fab: boolean = false

  private onScroll (e: any): void {
    if (typeof window === 'undefined') return 
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  private toTop (): void {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}
</style>