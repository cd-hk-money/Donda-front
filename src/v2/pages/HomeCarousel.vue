<template>
  <div>
    <v-carousel     
      class="ml-5"   
      hide-delimiter-background             
      hide-delimiters
      vertical hide cycle
      :show-arrows="false"
      height="50px"                                          
    >
      <v-carousel-item
        v-for="(carouselContent, i) in carouselContents"          
        :key="i"
      >
        <v-card 
          class="navbar__carousel__card"
          @click="pushLink(`/detail/${carouselContent.code}`)"                        
          height="66%" 
        >
          <span class="text-h7"> {{ carouselContent.title }} </span>            
          <span class="navbar__carousel__card__code"> {{ carouselContent.code }} </span>            
  
          <v-divider vertical inset class="ml-1 mr-1"/>
  
          <span class="ml-1"> ₩ {{ carouselContent.close.toLocaleString() }}</span>
          <span :class="carouselChangesClass(carouselContent.changes)">
            ₩ {{ addPreFixer(carouselContent.changes) }}
            <span class="ml-1">
              ({{ addPreFixer(carouselContent.changes_ratio) }}%)
            </span>
          </span>              
        </v-card>
      </v-carousel-item>          
    </v-carousel>    
  </div>
</template>

<script lang="ts">
  import StoreMixin from '@/mixins/StoreMixin.vue';
import { IStockModel } from '@/models/stock';
import { Component } from 'vue-property-decorator';

  @Component
  export default class HomeCarousel extends StoreMixin {

    pushLink(link: string) {
      if(this.$route.fullPath !== link) this.$router.push(link)
    }

    carouselChangesClass = (changes: number): string => {
      if(!changes) return ''
      return changes > 0 ? 'red--text' : 'blue--text'    
    }

    addPreFixer = (value: number): string => value > 0 ? '+' + value.toLocaleString() :value.toLocaleString() 

    get carouselContents(): IStockModel[] {
      return this.dailySimpleRanks.marcap.slice(0, 10).map((stock: (number | string)) => ({
        code: stock[1],
        title: stock[2],
        close: stock[4],
        changes: stock[5],
        changes_ratio: stock[6]      
      }))    
    }


  }
</script>

<style scoped>
.navbar__carousel {
  left: 200px;
  text-align: center;
}

.navbar__carousel__card {
  top: 10px;  
  display: flex;
  align-items: end;
  gap: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
}

.navbar__carousel__card__code {
  font-size: 14px;
  display: block;
  opacity: .8;
}
</style>