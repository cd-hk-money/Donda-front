<template>
  <v-card   
    class="ml-5 mr-5 mb-5 mt-5"
    width="410"
    height="200"
    rounded="xl"
    elevation="1"
  >
    <v-card-title class="font-weight-bold">      
      {{ title }}
    </v-card-title>      
    <v-card-subtitle>       
      {{ code }}
    </v-card-subtitle>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator' 

@Component({
  
})
export default class StockSimilarContent extends Vue {

  @Prop() title!: string  
  @Prop() code!: number | string
  
}

</script>