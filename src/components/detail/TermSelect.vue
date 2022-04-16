<template>
<v-row
  align="center"
  justify="start"
>  
  <v-col cols="12" sm="4">
    <v-btn-toggle     
      class="pl-16 ml-5"
      borderless
      color="cyan darken-1"
    >        
      <v-btn  
        bottom
        v-for="(icon, index) in icons"
        :key="index"
        :class="index===1 && 'mr-auto'"      
        class=""
        @click="toggle(index)"      
        icon > 
        <v-icon>{{icon}}</v-icon>
      </v-btn>    
    </v-btn-toggle>
  </v-col>
  <v-col>    
  </v-col>
</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component 
export default class TermSelect extends Vue {
  private icons = [
    'mdi-format-align-center',
    'mdi-format-align-left',
    'mdi-format-align-center',
    'mdi-format-align-right',
    'mdi-format-align-justify'
  ]

  private toggle(index: number) {
    console.log(index)
  }
}
</script>