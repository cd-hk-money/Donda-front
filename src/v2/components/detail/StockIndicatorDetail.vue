<template>
  <v-card     
    class="mt-5 ml-5 mr-5 mb-5"
    height="885"
    outlined
    elevation="0"                
    :width="isMobile ? 460 : '94%'"
  >    
    <v-card-title>
      보조 지표
    </v-card-title>

    <v-card-subtitle>
      각 보조 지표가 의미하는 바를 알아보세요.
    </v-card-subtitle>

    <v-divider></v-divider>
    
    <v-sheet elevation="0">
      <v-card-title class="text-h4">
        EPS
      </v-card-title>
      <v-card-subtitle class="text-h6">
        Earnings Per Share, EPS : 주당 순이익
      </v-card-subtitle>
      <v-card-text :class="['grey--text', getStrongFontColorClass]">
        <strong>당기 순이익</strong>을 <strong>유통 주식수로</strong> 나눈 수치를 의미합니다.
      </v-card-text>
    </v-sheet>    

    <v-divider></v-divider>

    <v-sheet>
      <v-card-title class="text-h4">
        BPS
      </v-card-title>
      <v-card-subtitle class="text-h6">
        Bookvalue per Share, BPS : 주당 순자산
      </v-card-subtitle>
    </v-sheet>    

    <v-divider></v-divider>

    <v-sheet>
      <v-card-title class="text-h4">
        ROE
      </v-card-title>
      <v-card-subtitle class="text-h6">
        Return On Equity, ROE : 자기자본이익률
      </v-card-subtitle>
    </v-sheet>    


    <!-- 주당순이익(EPS)과 주당순자산(BPS)이 동시에 늘어나는 종목에 투자하는 것이 가장 높은 수익률을 거두는 것으로 -->

  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class StockIndicatorDetail extends Vue {
 
  get isMobile() {
    return this.$vuetify.breakpoint.name === 'xs'
  }
  
  get getStrongFontColorClass () {
    return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
  }

}
</script>

<style scoped>
strong {  
  letter-spacing: .5px;
}

.strong-white strong {
  color: white;
}

.strong-black strong {
  color: black;
}
</style>