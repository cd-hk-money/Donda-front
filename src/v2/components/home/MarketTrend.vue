<template>
  <!-- <v-card
    class="mt-5 ml-5"
    elevation-0
    height="44vh"
    width="auto"
    rounded="xl"
    link
  >    
    <v-col 
      v-for="sparkline in sparklines"
      :key="sparkline.value"
    >
           
    </v-col>      
  </v-card> -->
    <v-card
    elevation="24"
    height="44vh"
    width="auto"
    class="mt-5 ml-5"
    rounded="xl"    
  >
    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
      delimiter-icon="mdi-minus"
      height="100%"
    >
      <v-carousel-item
        v-for="(slide, i) in sparklines"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile          
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-sparkline                                  
              class="pl-5 pr-5"
              line-width="5"
              :color="slide.color"
              smooth="100"
              auto-draw
              type="trend"
              :value="slide.value"
            ></v-sparkline>   
            
            <v-list two-line>
              <v-divider></v-divider>
              <v-list-item>        
                <v-list-item-content class="text-center">
                  <v-list-item-title class="text-h5">현재 {{ slide.text }}시장은 하락중입니다.</v-list-item-title>          
                </v-list-item-content>        
                <v-list-item-action-text>
                  <v-btn top left small icon>
                    <v-icon>fa-solid fa-circle-info</v-icon>
                  </v-btn>
                </v-list-item-action-text>
              </v-list-item>
            </v-list>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MarketTrend extends Vue {
  private sparklines = [
    {
      value: [0, 26, 5, 0, 18],
      color: '#40E0D0',
      text: '한국'
    },
    {
      value: [0, 0, 26, 5, 18],
      color: '#40E0D9',
      text: '미국'
    },
  ]

  private colors = [
    'white',
    'white',
  ]

  private slides = [
    'First',
    'Second',    
  ]
}
</script>