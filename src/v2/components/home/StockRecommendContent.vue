<template>
  <v-card   
    class="mb-3 mr-3 ml-3"
    :width="isMobile ? '100%' : '380'"    
    color="#252424"
    elevation="0"
    rounded="xl"
    v-if="!recommendStocksLoaded"
    @click="$router.push(`/detail/${content.code}`)"
  >    
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-4">
          {{ content.market }}
        </div>
    
        <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
          <span class="stock-title">{{ content.name }}</span>
          <v-tooltip right>
            <template v-slot:activator="{on}">
              <v-icon v-on="on" size="30" class="ml-5" :color="computedValues.trendIconColor">
                {{ computedValues.trendIcon }}
              </v-icon>
            </template>
            <span :class="['font-weight-bold', computedValues.trendColorClass ]">{{ computedValues.trendText }}</span> 
            <span> 추세입니다.</span>
          </v-tooltip>
        </v-list-item-title>

        <v-list-item-subtitle class="text-h5 mb-1 ml-5">
          {{ content.code }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-sheet 
      elevation="0"             
      height="104"
    >                
      <v-card-title class="text-h5 font-weight-bold ml-5">
        <span> ₩ {{ content.close.toLocaleString()}} </span>          
      </v-card-title>

      <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', computedValues.trendColorClass]">
        <span> ₩ {{ content.changes }} ({{ content.changes_ratio }}%)</span>                        
      </v-card-subtitle>

      <v-chip class="stock-info-sector" small >
        {{ content.sector }}
      </v-chip>
      
      <div class="stock-info-date">
        {{ content.date }}
      </div>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import DiviceMixin from '@/mixins/DiviceMixin.vue'
import { IStockModel } from '@/models/stock'
import { Component, Prop } from 'vue-property-decorator' 
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockRecommendContent extends DiviceMixin {
  
  @Prop() content!: IStockModel | undefined  

  @StockStoreModule.State('recommendStocksLoaded') recommendStocksLoaded!: boolean

  get computedValues () {
    const { changes_ratio, close } = this.content
    const before = Number(((100 - changes_ratio)* 1/100 * close).toFixed())
    const changeValue = close - before
    const isHighVal = changes_ratio > 0

    return {
      changeValue: ' ₩' + (isHighVal ? '+' + changeValue : changeValue),
      changeRatio: (isHighVal ? '+' + changes_ratio : changes_ratio) + '%',
      trendColorClass: isHighVal ? 'red--text' : 'blue--text',
      trendIcon: isHighVal ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
      trendIconColor: isHighVal ? 'red' : 'blue',
      trendText: isHighVal ? '상승' : '하락'
    }
  }

}

</script>

<style>

 .stock-similar-content {
  position: absolute;  
  right: 20px;  
  bottom: 20px;
 }

 .stock-similar-content-market {  
  padding-left: 15px;
  padding-top: 15px;
 }

 .s {
  color: #252424;

 }

 .stock-similar-content-title:hover {
    cursor: pointer;
 }

 .stockinfo-progress-circular {
  top: 50%;
  left: 50%;
  right: 50%;
  position: absolute;
}

.stock-info-mobile {  
  margin-top: 75px;  
}

.stock-info-date {
  position: absolute;
  bottom: 5px;
  right: 13px;
  opacity: .5;
}

.stock-info-sector {
  position: absolute; 
  font-size: 13px !important;
  top: 60%;
  right: 2%;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}


.stock-title:hover {
  cursor: pointer;
}
</style>