<template>
  <v-card    
    dark  
  >
    <v-list                   
      two-line>
      <v-list-item-group        
        v-model="selected"
      >
        <template v-for="(item, index) in items">            
          <v-list-item  
            class="ranking-content"
            @click="clickList"
             :key="item.code"
          >
                <v-list-item-avatar>
                  <p class="text-h4 font-weight-bold">{{ index + 1 }}</p>
                </v-list-item-avatar>            
                <v-list-item-content>                
                  <v-list-item-title 
                    class="text-h5"
                    v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle                  
                    v-text="item.code"
                  ></v-list-item-subtitle>                
                </v-list-item-content>                          
                <v-col cols="12" sm="2">
                  <p>₩ {{ item.stock }} </p> <p></p>
                </v-col>
                <v-col cols="12" sm="2">
                  <p>변동률 ...</p>
                </v-col>
              <v-list-item-action>                

                <v-icon                  
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>
              </v-list-item-action>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
      <v-container
        fluid
        class="text-center"
      >
        <v-btn @click="moreTran"          
          >
          <v-icon>
            mdi-arrow-down
          </v-icon>
        </v-btn>
      </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { StockSimpleModel } from '@/models/stock'


const StockStoreModule = namespace('StockStore')

@Component 
export default class TransList extends Vue {

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!:(code: string) => void

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private setTitle!:(code: string) => void

  @StockStoreModule.Getter('getStocks')
  private getStocks!: Array<StockSimpleModel>
  
  private selected: number = 0
  private count:number = 5
  private items: Array<StockSimpleModel> = []
  
  @Watch('selected', {immediate: true, deep: true})
  public selectedItem(): void {       
    if(!this.selected) return

    const code = this.items[this.selected].code
    const title = this.items[this.selected].title
    
    this.emitClickList()
    this.setCode(code)
    this.setTitle(title)
    this.$router.push(`/detail/${code}`)
    
  }

  // 더보기 
  private moreTran(): void {

    // 목록을 더 불러온다.
    this.items = this.getStocks.slice(0, this.count += 10)
    
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 500)    
  }    

  @StockStoreModule.Action('searchContents')
  // eslint-disable-next-line no-unused-vars
  private readonly searchContents!:(code: string) => Promise<any>

  private clickList(e: PointerEvent): void {
    e.target
  }

  created() {
    this.items = this.getStocks.slice(0, this.count += 5)
  }

  @Emit()
  emitClickList(): number {    
    return this.selected
  }
}
</script>

<style scoped>
.ranking-content {
  height: 73px;
}
</style>