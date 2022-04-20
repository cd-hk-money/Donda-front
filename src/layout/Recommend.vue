<template>
  <v-card   
    class="mt-7 grey darken-3 d-flex justify-space-around"
    height="35vh"
    
    rounded="xl">    
      <div  
        class="d-flex align-center"
        v-for="i in itemCount"
        :key="i"                
      >          
        <recommend-content />
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

  private seeMore() {
    this.itemCount += 4
    
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 500) 
  }
}

</script>