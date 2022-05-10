<template>
  <v-card 
    class="mt-5 ml-5 mr-5"
    height="365"
    width="94%"
    rounded="xl"
    elevation="1"
  >  
    <v-card-title class="ml-5">
      Similar
      <v-btn  
        class="ml-3"
        icon
        right
        x-small
      ><v-icon>fa-solid fa-circle-question</v-icon>
      </v-btn>
    </v-card-title>      
    <v-card-subtitle class="ml-5">
      유사 종목을 보여줍니다.
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

@Component
export default class StockSimilar extends Vue {
  mounted () {
    console.log('StockSimilar Mounted')
  }
}
</script>