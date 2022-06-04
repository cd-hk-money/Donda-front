<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5"
    height="885"
    outlined
    elevation="0"
    width="95%"                  
  >
    <v-card-title>
      적정 주가?
    </v-card-title>
    <v-card-subtitle>
      어떻게 적정 주가를 산출 했을까요?
    </v-card-subtitle>

    <v-divider></v-divider>
    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StockValuation extends Vue {
  
}

</script>