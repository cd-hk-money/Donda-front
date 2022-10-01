<template>
  <v-card   
    class="ml-5 mr-5 mb-5 mt-5"
    width="500"
    height="130"    
    outlined    
  >
    <v-card-title 
      class="font-weight-bold text-h5 stock-similar-content-title" 
      @click="$router.push(`/detail/${content.code}`)"
    >            
      {{ content.name }}
      <v-tooltip top>
        <template v-slot:activator="{on}">
          <v-icon class="ml-3" :color="trendIconColor" v-on="on">{{ trendIcon }}</v-icon>
        </template>
        <span :class="[colorClass, 'font-weight-bold']"> {{ trendText }}</span>중입니다.
      </v-tooltip>
    </v-card-title> 

    <v-card-subtitle class="text-h6">       
      {{ content.code }}
    </v-card-subtitle>

    <v-btn absolute right top icon x-large>
      <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>    

    <div class="stock-similar-content d-flex justify-center">
      <span class="text-h5">
        {{ close }}  
      </span>      
      <span :class="['text-h6 ml-2', colorClass]">
        {{ changeValue }} ({{ changesRatio }})
      </span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { IStockModel, StockRecommendModel } from '@/models/stock'
import { Component, Vue, Prop } from 'vue-property-decorator' 

@Component
export default class StockSimilarContent extends Vue {
  
  @Prop() content!: StockRecommendModel | undefined  

  get close () {        
    return (this.content.close).toLocaleString() + ' ₩'
  }    

  get changeValue () {
    const { changes_ratio, close } = this.content
    const before = Number(((100 - changes_ratio)* 1/100 * close).toFixed())
    const changeValue = close - before
    return (changeValue > 0 ? '+' + changeValue : changeValue) + ' ₩'
  }

  get changesRatio () {
    const { changes_ratio } = this.content
    return (changes_ratio > 0 ? '+' + changes_ratio : changes_ratio ) + '%'
  }

  get colorClass () {
    const { changes_ratio } = this.content
    return changes_ratio > 0 ? 'red--text' : 'blue--text'
  }

  get width () {
    return this.$vuetify.breakpoint.name === 'xs' ? '80%' : '94%'
  }

  get trendIcon () {
    const { changes_ratio } = this.content
    return changes_ratio > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'
  }

  get trendIconColor () {
    const { changes_ratio } = this.content
    return changes_ratio > 0 ? 'red' : 'blue'
  }

  get trendText () {
    const { changes_ratio } = this.content
    return changes_ratio > 0 ? '상승' : '하락'
  }

}

</script>

<style>

 .stock-similar-content {
  position: absolute;  
  right: 20px;  
  bottom: 10px;
 }

 .stock-similar-content-title:hover {
    cursor: pointer;
 }
</style>