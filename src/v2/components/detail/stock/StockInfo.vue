<template>
  <v-card 
    min-height="250"
    elevation="0"    
  >    
    <template v-if="!stock.loading && stock.data">
      <v-list-item three-line>  
        <v-list-item-content>
          <div class="mb-4">
            {{ stockData.market }} 
          </div>
          <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
            <span>{{ stockData.name }}</span>                 
            <v-tooltip right>
              <template v-slot:activator="{on}">
                <v-icon v-on="on" size="30" class="ml-5" :color="computed.trendIconColor">
                  {{ computed.trendIcon }}
                </v-icon>
              </template>
              <span :class="['font-weight-bold', computed.trendTextColor ]">{{ computed.trendText }}</span> 
              <span> 추세입니다.</span>
            </v-tooltip>
          </v-list-item-title>
          <v-list-item-subtitle class="text-h5 mb-1 ml-5">
            {{ stockData.code }}
          </v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar>                  
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon x-large
                v-on="on"                
                v-bind="attrs"
              >
                <v-icon size="40">{{ isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
              </v-btn>
            </template>
  
            <v-card width="500">
              <v-card-title class="text-h5">
                관심 종목 추가
              </v-card-title>
  
              <v-card-text>
                어느 그룹에 추가하시겠습니까?
              </v-card-text>
  
              <v-divider />
            
              <v-list>                  
                <v-list-item 
                  :key="group.title"
                  v-for="group in interestGroups"
                  @click="[
                    addInterestGroupItem({
                      title: group.title,
                      item: {
                        title: stockData.name,
                        code: stockData.code
                      }
                    }),
                    dialog = false,                    
                    updateState({
                      snackBarMessage: `${stockData.name}이(가) ${group.title}에 추가되었습니다.`,
                      snackBar: true
                    }),                                     
                  ]"
                >
                  <v-list-item-content>
                    <v-list-item-title class="ml-2">
                      {{ group.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              
              <v-divider />
  
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  확인
                </v-btn>
              </v-card-actions>              
            </v-card>
          </v-dialog>
        </v-list-item-avatar>              
  
      </v-list-item>

      <v-divider />
  
      <v-sheet elevation="0" height="120">                
        <v-card-title class="text-h5 font-weight-bold ml-5">
          <span> ₩ {{ stockData.close.toLocaleString()}}  </span>
        </v-card-title>

        <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', stockData.changes > 0 ? 'red--text' : 'blue--text']">
          <span> ₩ {{ computed.changes }}  ({{ computed.changes_ratio }}%)</span>                        
        </v-card-subtitle>

        <v-chip class="stock-info-sector" small >
          {{ stockData.sector }}
        </v-chip>
        
        <div class="stock-info-date">
          {{ stockData.date }}
        </div>
      </v-sheet>
    </template>

    <template v-else>
      <div class="text-center stockinfo-progress-circular">
        <v-progress-circular indeterminate color="#00BCD4" />        
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IUpdateStateModel } from '@/models/payload';
import { IInterestGroup, IInterestGroupItem } from '@/models/interest'
import StockStoreMixin from '@/mixins/StockStoreMixin.vue';
import DiviceMixin from '@/mixins/DiviceMixin.vue';
import { mixins } from 'vue-class-component';

const InterestStoreModule = namespace('InterestStore')

@Component
export default class StockInfo extends mixins(StockStoreMixin, DiviceMixin) {

  dialog = false

  get isBookmarked () {
    return this.bookmarked.find((v: string) => v === this.stock.data.name)
  }

  get stockData () { 
    return this.stock.data
  }

    
  // InterestStore
  @InterestStoreModule.State('interestGroups') interestGroups!: IInterestGroup[]
  @InterestStoreModule.State('snackBar') snackBar!: boolean
  @InterestStoreModule.State('bookmarked') bookmarked!: string[]
  @InterestStoreModule.Mutation('addInterestGroupItem') addInterestGroupItem!: (payload: {title: string, item: IInterestGroupItem}) => void  
  @InterestStoreModule.Mutation('removeInterestGroupItem') removeInterestGroupItem!: (itemTitle: string) => void
  @InterestStoreModule.Mutation('updateState') updateState!: (payload: IUpdateStateModel) => void

  
  
  get computed () {
    return {
      changes: (this.stock.data.changes > 0 ? '+': '') + this.stock.data.changes.toLocaleString(),
      changes_ratio: (this.stock.data.changes_ratio > 0 ? '+' : '') + this.stock.data.changes_ratio.toLocaleString(),
      trendIcon: this.stock.data.changes > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
      trendText: this.stock.data.changes > 0 ? '상승' : '하락',
      trendTextColor: this.stock.data.changes > 0 ? 'red--text' : 'blue--text',
      trendIconColor: this.stock.data.changes > 0 ? 'red' : 'blue'
    }
  }
  
  drawerChange () {
    this.$emit('drawerChange', 0)
  }
        
}
</script>
<style scoped>
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
}
</style>