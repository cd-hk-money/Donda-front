<template>
  <v-sparkline           
    class="mt-10 pt-10"
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
  </v-sparkline>      
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
  private width = 1.5
  private radius = 10
  private padding = 8
  private lineCap = "round"
  private gradient: string[] = gradients[5]
  private value: number[] = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
  private gradientDirection = "top"
  private gradients: Array<Array<string>> = gradients
  private fill = false
  private type = 'trend'
  private autoLineWidth = true  

}

</script>