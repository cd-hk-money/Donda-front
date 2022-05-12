<template>
  <v-card 
    class="mt-5 ml-5"
    height="365"
    width="94%"
    rounded="xl"
    elevation="1"
  >
    <v-card-title class="ml-5">
      NEWS
    </v-card-title>      
    <v-card-subtitle class="ml-5">
       종목 관련 뉴스를 보여줍니다.
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { mobileHeight } from '@/mixins/tools'

@Component
export default class StockNews extends Vue {

}
</script>