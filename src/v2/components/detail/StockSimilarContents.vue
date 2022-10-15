<template>
  <v-card   
    class="mb-1 mt-1 mr-1 ml-1"
    width="380"        
    color="#252424"
    elevation="0"     
  >    
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-4">
          {{ test.market }}
        </div>
    
        <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
          <span 
            class="stock-title"
            @click="$router.push(`/detail/${test.code}`)"
          >{{ test.name }}</span>
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
          {{ test.code }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-sheet 
      elevation="0"        
      height="104"
      color="#252429"
    >                
      <v-card-title class="text-h5 font-weight-bold ml-5">
        <span> {{ test.close.toLocaleString()}} ₩ </span>          
      </v-card-title>

      <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', computedValues.trendColorClass]">
        <span>{{ test.changes }}₩ ({{ test.changes_ratio }}%)</span>                        
      </v-card-subtitle>

      <v-chip class="stock-info-sector" small >
        {{ test.sector }}
      </v-chip>
      
      <div class="stock-info-date">
        {{ test.date }}
      </div>
    </v-sheet>
    <!-- <div class="stock-similar-content-market">
      {{ content.market }}
    </div>    
    <v-card-title class="font-weight-bold text-h5 ml-2">            
      <span class="stock-similar-content-title" @click="$router.push(`/detail/${content.code}`)">
        {{ content.name }}
      </span>
      <v-tooltip top>
        <template v-slot:activator="{on}">
          <v-icon class="ml-3" :color="trendIconColor" v-on="on">{{ trendIcon }}</v-icon>
        </template>
        <span :class="[colorClass, 'font-weight-bold']"> {{ trendText }}</span>중입니다.
      </v-tooltip>
    </v-card-title> 

    <v-card-subtitle class="text-h6 ml-2">       
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
    </div> -->
  </v-card>
</template>

<script lang="ts">
import { IStockModel, StockRecommendModel } from '@/models/stock'
import { Component, Vue, Prop } from 'vue-property-decorator' 
import { namespace } from 'vuex-class'

const StockStoreModule = namespace('StockStore')

@Component
export default class StockSimilarContent extends Vue {
  
  @Prop() content!: StockRecommendModel | undefined  
  @Prop() test!: IStockModel

  @StockStoreModule.Action('getStock') getStock!: (code: string) => Promise<void>

  get computedValues () {
    const { changes_ratio, close } = this.test
    const before = Number(((100 - changes_ratio)* 1/100 * close).toFixed())
    const changeValue = close - before
    const isHighVal = changes_ratio > 0

    return {
      changeValue: (isHighVal ? '+' + changeValue : changeValue) + ' ₩',
      changeRatio: (isHighVal ? '+' + changes_ratio : changes_ratio) + '%',
      trendColorClass: isHighVal ? 'red--text' : 'blue--text',
      trendIcon: isHighVal ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
      trendIconColor: isHighVal ? 'red' : 'blue',
      trendText: isHighVal ? '상승' : '하락'
    }
  }

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

  mounted () {
    console.log(this.test)
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