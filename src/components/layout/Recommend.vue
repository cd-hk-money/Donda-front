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

import { Component, Vue } from 'vue-property-decorator'
import RecommendContent from '@/components/recommend/RecommentContent.vue'

@Component({
  components: {
    RecommendContent      
  }
})
export default class Recommend extends Vue {

}

</script>