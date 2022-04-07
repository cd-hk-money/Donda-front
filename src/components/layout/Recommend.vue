<template>
  <v-row>
    <v-col
      cols="12"
      sm="1"
    >
    </v-col>
    <v-col
      cols="12"
      sm="10"                  
    >       
      <p
        class="text-h5 font-weight-bold "
        style="color:white;"           
      >오늘의 추천 종목</p>
      
      <v-card 
        elevation="0"
        class="grey darken-2"
        dark
      >                
      </v-card>      
      <v-row>
        <v-col  
          v-for="i in itemCount"
          :key="i"
          cols="12"
          sm="3"
        >          
          <recommend-content />
        </v-col>  
      </v-row>  
      <v-row>
        <v-col 
          sm="11"
          cols="12"
        ></v-col>
        <v-col
          sm="1"
          cols="12"
        >
          <span             
            class="text-h10 text--disabled"            
            @click="seeMore"
              >더보기</span>                
        </v-col>
      </v-row>             
    </v-col> 
  </v-row>   
        
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