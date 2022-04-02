<template>
  <v-card
    class="pa-2"
    max-width="344"
    min-height="300"
  >
    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ subTitle }}
    </v-card-subtitle>

  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'


@Component
export default class RecommendConent extends Vue {

  @Prop({ default: '기업이름'}) title!: string
  @Prop({ default: '코드'}) subTitle!: string

  private show: boolean = false
}
</script>