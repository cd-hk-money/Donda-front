<template>
  <v-card   
    class="ml-5 mr-5 mb-5 mt-5"
    width="94%"
    height="150"    
    rounded="xl"
    elevation="1"                    
    @click="pushDetail"
  >
    <v-card-title class="font-weight-bold">      
      {{ name }}
    </v-card-title>      
    <v-card-subtitle>       
      {{ code }}
    </v-card-subtitle>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator' 

@Component
export default class StockSimilarContent extends Vue {

  @Prop() name!: string  
  @Prop() code!: number | string

  created () {
    console.log(this.$route.params.title)
  }

  pushDetail () {
    this.$router.push(`/detail/${this.code}`)  
  }
  
}

</script>