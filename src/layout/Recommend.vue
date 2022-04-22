<template>
  <v-card
    class="grey darken-4 d-flex justify-space-around"
    rounded="xl"
    height="30vh" 
  >            
    <div
      class="d-flex align-center"
      v-for="i in itemCount"
      :key="i"                
    >              
      <transition name="zoom">
        <div v-if="show">
          <recommend-content />
        </div>
      </transition>
    </div>        
  </v-card>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'

// components
import RecommendContent from '@/components/recommend/RecommentContent.vue'

@Component({
  components: {
    RecommendContent      
  }
})
export default class Recommend extends Vue {
  @Prop({default: 'white'}) color!: boolean
  
  private itemCount = 4
  private expand = false
  private show = false

  private seeMore() {
    this.itemCount += 4
    
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 500) 
  }

  mounted () {
    this.show = true
  }

  unmounted () {
    this.show = false
  }
}

</script>

<style>
.zoom-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.zoom-enter-active {  
  transition: opacity .9s ease-out;
  transform: translateZ(0);
}

</style>