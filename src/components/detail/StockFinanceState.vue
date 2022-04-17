<template>
  <v-card 
    class="mt-7 mb-5 ml-7 grey darken-4"
    min-height="auto"
    elevation="0"        
  >
    <v-carousel       
      elevation="0"      
      v-model="model"
      hide-delimiters
      hide-delimiter-background
      height="340"
      show-arrows-on-hover
      :prev-icon="false"
      vertical
    >
      <template v-slot:next="{ on, attrs }">
        <v-btn           
          color="cyan"
          v-bind="attrs"
          v-on="on"
          @click="toogle=!toogle"
        >{{ !toogle ? '상세히' : '간단히' }}</v-btn>
      </template>
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h4">
              {{ !i ? '재무제표 간단정보..' : '재무제표 상세정보'}}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StockFinanceStateChart from '@/components/detail/StockFinanceStateChart.vue'

@Component({
  components: {
    StockFinanceStateChart
  }
})
export default class StockFinanceState extends Vue {
  private model = 0
  private toogle = false
  private colors: string[] = [
    'grey darken-4',
    'grey darken-3',
  ]
}
</script>