<template>
  <v-card
    height="44vh"
    width="auto"
    class="mt-5 ml-5"
    rounded="xl"
    elevation="3"
  >
    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
      delimiter-icon="mdi-minus"
      height="100%"          
      elevation="3"
    >
      <v-carousel-item
        v-for="(slide, i) in sparklines"
        :key="i"
      >
        <v-sheet
          height="100%"
          rounded="xl"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-sparkline                                  
              color="#40E0D0"
              class="pl-5 pr-5"
              line-width="5"
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
                  <v-btn top left small icon @click="overlay = !overlay">
                    <v-icon>fa-solid fa-circle-info</v-icon>
                  </v-btn>
                </v-list-item-action-text>
              </v-list-item>
            </v-list>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-overlay 
      :value="overlay"
      opacity="0.88"
      absolute
    >
      <div>
        하락하면 뭐가 좋고 뭐가 나쁜가? 설명
      </div>
      <div class="d-flex justify-center">
        <v-btn 
          bottom
          @click="overlay = false">
          닫기
        </v-btn>
      </div>
    </v-overlay>
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
  
  private slides = [
    'First',
    'Second',    
  ]

  private overlay = false

  private cycle = true
}
</script>