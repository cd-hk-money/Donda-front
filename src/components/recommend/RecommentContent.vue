<template>
  <v-hover
    v-slot="{ hover }"
    open-delay="30"        
  >
    <v-card
      dark
      class="pa-2"
      :class="{'on-hover': hover}"
      max-width="344"
      min-height="300"
      rounded="xl"
      :elevation="hover ? 16 : 2"
      @click="cardClick"
    >
      <v-card-title>
        <v-row>
          <v-col cols="12" sm="10">
            <span class="text-h6">
              {{ title }}
            </span>         
          </v-col>
          <v-col cols="12" sm="2">
            <v-icon>
               mdi-star-outline
            </v-icon>
          </v-col>
        </v-row>
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
  @Prop({ default: '000000'}) subTitle!: string

  private show: boolean = false

  private cardClick(): void {
    console.log(this.subTitle)
  }
}
</script>


<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(0, 0, 0, 0.07)
  >.v-card__text
    color: #000
</style>