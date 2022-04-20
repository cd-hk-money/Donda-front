<template>
  <v-hover
    v-slot="{ hover }"
    open-delay="30"        
  >
    <v-card
      v-show="expand"
      dark
      min-width="30vh"    
      max-height="95%"
      min-height="30vh"
      rounded="xl"
      :elevation="hover ? 3 : 0"
      :to="`/detail/${code}`"
    >
      <v-card-title>
        <v-row>
          <v-col cols="12" lg="10" sm="7">
            <span>
              {{ title }}
            </span>         
          </v-col>
          <v-col cols="12" lg="2" sm="5">
            <v-btn icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-btn>
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
  @Prop({ default: true}) expand!: boolean

  @StockStoreModule.Mutation('setCode')
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  private setTitle!: (title: string) => void

}
</script>


<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(0, 0, 0, 0.07)
  >.v-card__text
    color: #000
</style>