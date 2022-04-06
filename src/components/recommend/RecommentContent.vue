<template>
  <v-hover
    v-slot="{ hover }"
    open-delay="30"        
  >
    <v-card
      dark
      class="pa-2"
      :class="{'on-hover': hover}"
      max-width="230"
      min-height="240"
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
        {{ code }}
      </v-card-subtitle>

    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')


@Component
export default class RecommendConent extends Vue {

  @Prop({ default: '기업이름'}) title!: string
  @Prop({ default: '000000'}) code!: string

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private setTitle!: (title: string) => void

  private show: boolean = false

  private cardClick(): void {
    this.setCode(this.code)
    this.setTitle(this.title)
    this.$router.push(`/detail/${this.code}`)
  }
}
</script>


<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(0, 0, 0, 0.07)
  >.v-card__text
    color: #000
</style>