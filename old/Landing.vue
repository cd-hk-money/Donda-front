<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">        
        <avatar />
        <!-- <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn> -->

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <!-- <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            :title="title"
          ></v-text-field> -->
          <v-autocomplete       
            cless="mx-4"
            dense            
            flat
            rounded
            solo-inverted
            cache-items
            v-if="loaded"     
            ref="autoinput"
            v-model="searchTable"            
            :items="items"
            :search-input.sync="search"
            hide-no-data
            hide-details
            label="기업명, 코드"
            >            
          </v-autocomplete>            
        </v-responsive>
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>        
        <v-row>
          <side-nav />
          <v-col>
            <v-sheet
              max-height="50vh"
              rounded="lg"              
            >
             <v-carousel
                cycle                
                hide-delimiter-background
                show-arrows-on-hover
                height="400"
              >
                <v-carousel-item                  
                  v-for="(slide, i) in slides"
                  :key="i"
                >                                                                                
                  <v-sheet
                    :color="colors[i]"
                    height="70vh"
                  >
                    <v-col
                      cols="12"
                    >
                      <v-sparkline
                        :value="sparkValues"
                        :gradient="gradient"
                        :smooth="radius || false"
                        :padding="padding"
                        :line-width="width"
                        :stroke-linecap="lineCap"
                        :gradient-direction="gradientDirection"
                        :fill="fill"
                        :type="type"
                        :auto-line-width="autoLineWidth"
                        auto-draw
                      ></v-sparkline>
                    </v-col>
                  </v-sheet>
                </v-carousel-item>
             </v-carousel>
            </v-sheet>    
          </v-col>       
          <v-col cols="2">
            <v-sheet      
              min-height="30vh"
              v-if="loaded"         
              rounded="lg">
              <v-list                 
                color="transparent">
                <v-list-item                   
                  v-for="stock in stocks.slice(0, 10)"                  
                  :key="stock.code"                  
                  link
                >
                  <v-list-item-content>                                        
                    <v-list-item-title v-on:click.self="searchStock" >
                      {{ stock.title }} 
                    </v-list-item-title> 
                    <v-list-item-subtitle>
                      {{ stock.code}}  
                    </v-list-item-subtitle>                   
                  </v-list-item-content>
                  
                </v-list-item>

                <v-divider class="my-2"></v-divider>
                
              </v-list>              
              
            </v-sheet>            
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
             ></v-progress-circular>
          </v-col>          
        </v-row >
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { StockSimpleModel } from '@/models/stock';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import TopList from '../src/old./../old/TopList.vue'
import Avatar from './Avatar.vue'
import SideNav from '../src/old./../old/SideNav.vue'

const StockStoreModule = namespace('StockStore')

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

@Component({
  components: {
    TopList,
    Avatar,
    SideNav
  }
})
export default class Landing extends Vue {

  // chartTest
  private links: Array<string> = ['Dashboard', 'Messages', 'Profile', 'Updates']
  private width = 2
  private radius = 10
  private padding = 8
  private lineCap = 'round'
  private gradient = gradients[5]
  private gradientDirection = 'top'
  private gradients = gradients
  private fill = false
  private type = 'trend'
  private autoLineWidth = false

  // autocompleteTest
  private items: Array<string> = []
  private search: any = null

  // CarouselsTest
  private colors: Array<string> = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',    
  ]
  private slides: Array<string> = [
    'First',
    'Second',
    'Third',   
  ]

  // avatar
  private user: BarUser = {
    initials: 'CODMA',
    fullName: 'CODMA-CODMA',
    email: 'codma@naver.com'
  }

  // Vuex Stores
  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.State('sparkValues')
  private sparkValues!: Array<number>

  @StockStoreModule.State('title')
  private title!: string
  
  @StockStoreModule.State('stocks')
  private stocks!: StockSimpleModel[]

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private readonly setTitle!: (title: string) => void

  @StockStoreModule.Mutation('setSparkValues')
  // eslint-disable-next-line no-unused-vars
  private readonly setSparkValues!: (values: Array<number>) => void

  @StockStoreModule.Action('todayMarket')
  private readonly todayMarket!: () => void

  @StockStoreModule.Action('searchContents')
  private readonly searchContents!: () => void
 
  @StockStoreModule.Getter('searchTable')
  private readonly searchTable!: Array<string>

  
  private searchStock(arg: any) {    
    this.setTitle(arg.target.innerText)
    this.searchContents()
  }

  // created
  created(): void {
    this.todayMarket()
    this.setSparkValues([0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0])
  }

  // watch
  @Watch("search")
  public watchSearch(val: any) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }

  // methods
  private querySelections(val: any) {
    let timeout=  0
    window.clearTimeout(timeout)
    setTimeout(() => {
      this.items = this.searchTable.filter(e => {
        return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
      })
    })
  }
}
  
</script>
