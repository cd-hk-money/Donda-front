<template>
  <v-row>
    <v-col>
      <v-card
        class="mt-5 ml-5"
        height="44vh"
        width="44vh"
        rounded="ml"
        link
      >
        <v-card-title>
          종목 추천
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StockRecommend extends Vue {
  
}
</script>