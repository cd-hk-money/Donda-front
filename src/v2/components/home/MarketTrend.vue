<template>
  <v-card
    height="39vh"
    :width="mobile ? 460 : '94%'"
    class="ml-5 mr-5 mt-5"
    elevation="0"
    outlined
  >
    <v-card-title class="text-h4 font-weight-bold ml-5">
      시장 동향
      <v-btn
        icon      
        large
        @click="overlay = !overlay"
      >
        <v-icon>fa-solid fa-circle-info</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle class="ml-5">
      현재 시장 동향을 알아보세요.
    </v-card-subtitle>

    <v-divider></v-divider>
    <v-carousel      
      cycle
      :show-arrows="false"
      hide-delimiter-background
      hide-delimiters    
      height="94%"          
      elevation="3"
    >
      <v-carousel-item
        v-for="(slide, i) in sparklines"
        :key="i"
      >
        <v-sheet height="100%">
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MarketTrend extends Vue {
  
  // 오버레이 유무
  overlay = false
  
  // V-SPARKLINE 데이터
  sparklines = [
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

  get mobile () { return this.$vuetify.breakpoint.name === 'xs'}    

}
</script>

<style scoped>

</style>