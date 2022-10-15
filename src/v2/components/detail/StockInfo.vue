<template>
  <v-card 
    :class="['ml-5 mr-5', mobile ? 'mt-5 mr-15' : 'mt-5']"    
    height="240"
    width="465"
    outlined   
    elevation="0"    
  >    
    <template v-if="!loaded">
      <v-list-item three-line>  
        <v-list-item-content>
          <div class="mb-4">
            {{ stock.market }} 
          </div>
          <v-list-item-title class="text-h4 font-weight-bold m-1 ml-5">
            <span>{{ stock.name }}</span>                 
            <v-tooltip right>
              <template v-slot:activator="{on}">
                <v-icon v-on="on" size="30" class="ml-5" :color="prefixedValue.trendIconColor">
                  {{ prefixedValue.trendIcon }}
                </v-icon>
              </template>
              <span :class="['font-weight-bold', prefixedValue.trendTextColor ]">{{ prefixedValue.trendText }}</span> 
              <span> 추세입니다.</span>
            </v-tooltip>
          </v-list-item-title>
          <v-list-item-subtitle class="text-h5 mb-1 ml-5">
            {{ stock.code }}
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
  
              <v-divider></v-divider>
            
              <v-list>                  
                <v-list-item 
                  :key="group.title"
                  v-for="group in interestGroups"
                  @click="[
                    addInterestGroupItem({
                      title: group.title,
                      item: {
                        title: stock.name,
                        code: stock.code
                      }
                    }),
                    dialog = false,                    
                    updateState({
                      snackBarMessage: `${stock.name}이(가) ${group.title}에 추가되었습니다.`,
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
              
              <v-divider></v-divider>
  
              <v-card-actions>
                <v-spacer></v-spacer>
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
  
      <v-sheet 
        elevation="0"
        outlined        
        height="120"
      >                
        <v-card-title class="text-h5 font-weight-bold ml-5">
          <span> {{ stock.close.toLocaleString()}} ₩ </span>
          <v-btn  
            class="ml-3"
            icon
            right
            x-small
            @click="drawerChange"
          ><v-icon>fa-solid fa-circle-info</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-subtitle :class="['text-h6', 'font-weight-bold', 'ml-5', stock.changes > 0 ? 'red--text' : 'blue--text']">
          <span>{{ prefixedValue.changes }}₩ ({{ prefixedValue.changes_ratio }}%)</span>                        
        </v-card-subtitle>

        <v-chip class="stock-info-sector" small >
          {{ stock.sector }}
        </v-chip>
        
        <div class="stock-info-date">
          {{ stock.date }}
        </div>
      </v-sheet>
    </template>

    <template v-else>
      <div class="text-center stockinfo-progress-circular">
        <v-progress-circular indeterminate color="#40E0D0" />        
      </div>
    </template>
</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IUpdateStateModel } from '@/models/payload';
import { IStockModel } from '@/models/stock'
import { IInterestGroup, IInterestGroupItem } from '@/models/interest'
import Stock from './Stock.vue';


const StockStoreModule = namespace('StockStore')
const InterestStoreModule = namespace('InterestStore')

@Component
export default class StockInfo extends Vue {

  dialog = false

  get isBookmarked () {
    return this.bookmarked.find((v: string) => v === this.stock.name)
  }
      
  // StockStore
  @StockStoreModule.State('stock') stock!: IStockModel
  @StockStoreModule.State('stockLoaded') loaded!: boolean
  @StockStoreModule.Action('getStock') getStock!: (name: string) => Promise<void>

  // InterestStore
  @InterestStoreModule.State('interestGroups') interestGroups!: IInterestGroup[]
  @InterestStoreModule.State('snackBar') snackBar!: boolean
  @InterestStoreModule.State('bookmarked') bookmarked!: string[]
  @InterestStoreModule.Mutation('addInterestGroupItem') addInterestGroupItem!: (payload: {title: string, item: IInterestGroupItem}) => void  
  @InterestStoreModule.Mutation('removeInterestGroupItem') removeInterestGroupItem!: (itemTitle: string) => void
  @InterestStoreModule.Mutation('updateState') updateState!: (payload: IUpdateStateModel) => void

  get mobile () { 
    return this.$vuetify.breakpoint.name === 'xs' 
  }

  // <span>{{ stock.changes > 0 ? '+' + stock.changes.toLocaleString() : stock.changes.toLocaleString() }}₩ ({{ stock.changes_ratio > 0 ? '+' + stock.changes_ratio : stock.changes_ratio}}%)</span>                        
  get prefixedValue () {
    return {
      changes: (this.stock.changes > 0 ? '+': '') + this.stock.changes.toLocaleString(),
      changes_ratio: (this.stock.changes_ratio > 0 ? '+' : '') + this.stock.changes_ratio.toLocaleString(),
      trendIcon: this.stock.changes > 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
      trendText: this.stock.changes > 0 ? '상승' : '하락',
      trendTextColor: this.stock.changes > 0 ? 'red--text' : 'blue--text',
      trendIconColor: this.stock.changes > 0 ? 'red' : 'blue'
    }
  }
  
  drawerChange () {
    this.$emit('drawerChange', 0)
  }
        
  async mounted () {          
    const code = this.$route.params.title
    await this.getStock(code)    
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
  bottom: -5px;
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