<template>
  <v-card
    class="grey darken-3"
    min-height="auto"
    max-height="auto"
    rounded="xl"
    dark
    link
  >
    <v-card-title class="font-weight-bold text-h5">
      {{ title.title}}
    </v-card-title>
    <v-card-subtitle class="grey--text">
      {{ title.code }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class StockTitle extends Vue {
  @Prop({default: {
    title: 'null',
    code: 'null', 
  }})
  private title!: {
    title: string,
    code: string
  }   
}
</script>
