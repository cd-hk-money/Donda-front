<template>       
  <v-container id="scroll-target">
    <v-row>      
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
          id="scroll-target"
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
        <transition name="fade">
          <v-btn   
            dark
            class="cyan"
            v-if="btnShow"
            bottom
            fixed
            fab
            @click="toTop"
            rounded>
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </transition>
      </v-col>  
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SideBar from '@/layout/SideBar.vue'
import TransList from '@/layout/TransList.vue'

@Component({
  components: {
    SideBar,
    TransList
  }
})
export default class Trans extends Vue {
  private btnShow = false

  private toTop() {
    this.$vuetify.goTo('#scroll-target')
    this.btnShow = false
  }

  private handleScroll () {
    let scrollTop = window.pageYOffset 
    this.btnShow = scrollTop > 1500 ? true : false
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }

}
</script>

<style scoped>
.main-content {
  margin-top: 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>