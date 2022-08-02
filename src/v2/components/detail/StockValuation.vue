<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5"
    height="885"
    outlined
    elevation="0"
    width="95%"                  
  >
    <v-card-title>
      적정 주가?
    </v-card-title>
    <v-card-subtitle>
      어떻게 적정 주가를 산출 했을까요?
    </v-card-subtitle>    

    <v-divider></v-divider>

    <v-btn-toggle v-model="toggle_exclusive" tile multiple class="valuation-btn-toggle">
      <v-btn v-for="(valuation, i) in valuations" :key="i" :color="valuation.color" small>
        <span class="white--text"> {{ valuation.title }} </span>
      </v-btn>
    </v-btn-toggle>
    
    <stock-valuation-chart 
      class="mt-2 ml-2 mr-2"
      :height="chartHeight"
      :legend="toggle_exclusive"
      v-if="!loaded"
    />

    <v-divider></v-divider>

  

    

      <!-- <v-card
        class="ml-5 mr-5 mt-5 d-flex"
        height="120"
        rounded="xl"
        elevation="0"
        outlined
        :key="i"
        v-for="(valuation, i) in valuations"
      >
        <div class="valuation-label" :style="{'background-color': valuation.color}"></div>      
        <div>
          <div class="ml-3 mt-1 valuation-title" :style="{'color': valuation.color, }"> {{ valuation.title }}</div>
          <v-card-text>
            {{ valuation.content }}
          </v-card-text>
        </div>
      </v-card> -->
    <v-tabs v-model="tab" class="valuation-tabs">
      <v-tabs-slider :color="colors[tab]" />
      <v-tab active-class="valuation-active-donda">        
        돈다 지수
      </v-tab>
      <v-tab active-class="valuation-active-one">        
        <v-badge overlab color="grey" content="분기">
          EPS-ROE
        </v-badge>   
      </v-tab>
      <v-tab active-class="valuation-active-two">   
        <v-badge overlab color="grey" content="분기">
          S-RIM          
        </v-badge>     
      </v-tab>
      <v-tab active-class="valuation-active-three">        
        PER 방법
      </v-tab>

      <v-tab-item>
        <v-card flat class="valuation-donda">
          <v-card-text>
            <p>
              <strong>돈다</strong> 에서 자체적으로 계산한 주가 지수입니다.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat class="valuation-one">
          <v-card-text>
            <p>
              <strong>EPS</strong>와 <strong>ROE</strong>를 활용한 적정 주가 계산 공식입니다.
            </p>
            <p class="text-h5 blue--text">
              <!-- <math-jax :latex="'$$EPS = {순이익 \\over 주식수} = 1주당순이익$$'"/> -->
            </p>
            <p class="text-h5 blue--text">
              <v-divider vertical></v-divider>
              <!-- <math-jax :latex="'$$ROE = {순이익 \\over 자기자본} = 자기자본이익률$$'"/> -->
            </p>
            <div>              
            </div>            
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="valuation-two">
              <span>
                <strong>사경인 회계사</strong>
                <v-icon size="13" class="valuation-two-tootip">fa-solid fa-circle-question</v-icon>
              </span>
               에서 제시한 <strong>RIM 모델</strong>을 활용한 주가 계산 공식입니다.
          </v-card-text>
        </v-card>
        <v-divider vertical></v-divider>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            PER 방법.
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import StockValuationChart from '@/v2/components/detail/StockValuationChart.vue'
import { namespace } from 'vuex-class'
import { IValuationContent } from '@/models/market'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockValuationChart,
  }
})
export default class StockValuation extends Vue {
  
  tab = 0
  toggle_exclusive = [0, 1, 2, 3]
  colors: string[] = ['#ff6384', '#994433', '#6495ed', '#800080']
  formula = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
  v = {
    roe: [1,2,3,4,5,6,7,7,8,],    
    's-rim': [1,2,3,4,5,8,9],
  }

  roe = {
    date: ['3', '6', '9', '12'],
    datas: [1, 2, 3, 4]
  }

  @StockStoreModule.State('stockGraphDefaultLoaded') loaded!: boolean


  get chartHeight (): number {
    return this.$vuetify.breakpoint.name === 'xs' ? 200 : 100
  }

  valuations: IValuationContent[] = [
    {
      color: '#40E0D0',
      title: '현재 주가',
      content: '내용'
    },
    {
      color: '#ff6384',
      title: '돈다 지수',
      content: '내용'
    },
    {
      color: '#994433',
      title: '방법 1',
      content: '내용'
    },
    {
      color: '#6495ed',
      title: '방법 2',
      content: '내용'
    },
  ]  
}

</script>

<style>
.valuation-label {
  max-height: 120px;    
  min-height: 120px;    
  text-align: center;
  border-radius: 25px;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  overflow: hidden;
  width: 40px;
}


.valuation-active-donda {
  font-weight: bold !important;
  color: #ff6384 !important;  
}

.valuation-donda strong {
  color: #ff6384;
}
.valuation-active-one {
  font-weight: bold !important;
  color: #943 !important;
}

.valuation-active-two {
  font-weight: bold !important;
  color: #6495ed !important;
}

.valuation-active-three {
  font-weight: bold !important;
  color: #800080 !important;
}

.valuation-title {
  font-weight: bold;
  font-size: 20px;
}

.valuation-two-tootip {
  position: relative;
  top: -5px;
  right: 0px;
}

.valuation-one strong {
  color: #994433;
}

.valuation-two strong {
  color: #6495ed;
}

.valuation-three strong {
  color: #800080;
}

.valuation-btn-toggle {
  position: absolute;
  right: 0px;
  top: 58px;
}


</style>