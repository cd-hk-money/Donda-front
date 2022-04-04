<template>
  <div>
    <v-sparkline
      dark
      :color="color"
      :value="value"    
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"    
      auto-draw        
    >
      <!-- <template v-slot:label="item">
        {{ item.value }}
      </template>        -->
    </v-sparkline>  
    <!-- <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    /> -->
  </div>  
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'], 
]

@Component ({

}) 
export default class MarketChart extends Vue {
  
  // @Prop({ default: []}) readonly labels!: Array<string>
  @Prop({ default: []}) readonly color!: string
  // @Prop({ default: []}) readonly data!: Array<number>
  // @Prop({
  //   default: () => {
  //     return Chart.defaults.doughnut
  //   }
  // })
  // readonly options: object | undefined

  // mounted () {

  // }

  // sparkLine
  private width: number = 1.5
  private radius: number = 10
  private padding: number = 8
  private lineCap: string = "round"
  private gradient: string[] = gradients[5]
  private value: number[] = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
  private gradientDirection: string = "top"
  private gradients: Array<Array<string>> = gradients
  private fill: boolean = false
  private type: string = 'trend'
  private autoLineWidth: boolean = true


}

</script>