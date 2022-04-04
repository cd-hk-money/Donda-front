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
      <v-card 
        elevation="0"
        class="grey darken-2"
        dark
      >        
        <v-card-title class="text-h5 font-weight-bold">       
          오늘의 추천 종목   
        </v-card-title>
      </v-card>      
      <v-row>
        <v-col  
          v-for="i in 3"
          :key="i"
          cols="12"
          sm="4"
        >          
          <recommend-content />
        </v-col>
      </v-row>         
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >                
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
}

</script>