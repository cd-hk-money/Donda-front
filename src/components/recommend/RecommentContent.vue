<template>
  <v-hover
    v-slot="{ hover }"
    open-delay="10"
  >
    <v-card
      class="pa-2"
      :class="{'on-hover': hover}"
      max-width="344"
      min-height="300"
      rounded="xl"
      :elevation="hover ? 16 : 2"
    >
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-subtitle>
        {{ subTitle }}
      </v-card-subtitle>

    </v-card>
  </v-hover>
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


<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>