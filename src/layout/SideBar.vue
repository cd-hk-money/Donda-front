<template>
  <v-navigation-drawer    
    expand-on-hover
    dark 
    left
    fixed
    floating
    hide-overlay
    overlay-opacity="0.5"
    permanent
    clipped
  >    
    <v-list>        
      <stock-search dark/>
    </v-list>

    <v-divider></v-divider>

    <v-list
      height="auto"
      nav
      dense
      v-for="(interest, index) in interetGroups"
      :key="index"
    >
      <v-list-item link >
        <v-list-item-icon>
          <v-icon>{{ interest.icon }}</v-icon>
        </v-list-item-icon>          
        <v-list-item-title>{{ interest.title }}</v-list-item-title>
          <v-btn 
            @click="editInterestGroup(interest.title)"
            icon>
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
      </v-list-item>     
      
    </v-list>  

    <v-divider></v-divider>
    <v-list>
      <div  
        v-if="!inputMode"
        class="text-center"
      >
        <v-btn 
          elevation="0"
          rounded
          fixed
          block
          color="primary"
          v-if="!inputMode"          
          @click="inputMode=true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>   
      <v-text-field       
        v-show="loaded" 
        filled
        dense            
        flat
        v-else
        rounded
        autofocus    
        v-model="groupTitle"  
        ref="groupInput"
        @blur="inputModeBlur"    
        @keypress.enter="addInterestGroup"  
      ></v-text-field>
    </v-list>
      <template v-slot:append>             
        <div class="pa-2">
          <v-btn 
            target="_blank"
            href="https://github.com/cd-hk-money"
            icon
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </div>            
      </template>

  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

// models
import { InterestGroupModel } from '@/models/interest'
import { StockSimpleModel } from '@/models/stock'

// components 
import StockSearch from '@/layout/StockSearch.vue'

const StockStoreModule = namespace('StockStore')

@Component({
  components: {
    StockSearch
  }
})
export default class SideBar extends Vue {
  @StockStoreModule.State('searchTable')
  private readonly searchTable!: Array<string>

  @StockStoreModule.State('stocks')
  private stocks!: StockSimpleModel[]

  @StockStoreModule.State('loaded')
  private loaded!: boolean

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private setTitle!: (title: string) => void

  // 검색창 
  private search: any = null

  // 검색창 다이어로그
  private dialog = false

  // 자동완성 항목
  private items: Array<string> = []
  private inputMode = false
  private groupTitle = ''

  // 관심종목 그룹
  private interetGroups: Array<InterestGroupModel> = [
    {
      title: '관심종목 그룹1',
      icon: "mdi-star",
      groupItem: []
    },
    {
      title: '관심종목 그룹2',
      icon: "mdi-star",
      groupItem: []
    },
    {
      title: '관심종목 그룹1',
      icon: "mdi-star",
      groupItem: []
    },
    {
      title: '관심종목 그룹2',
      icon: "mdi-star",
      groupItem: []
    },
  ]

  @Watch("search")
  public watchSearch(val: unknown) {
    if(!val) return
    val && val !== this.searchTable && this.querySelections(val)
  }

  private querySelections(val: any) {
    let timeout=  0
    window.clearTimeout(timeout)
    setTimeout(() => {
      this.items = this.searchTable.filter(e => {
        return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
      })
    })
  }

  // private push(): void {
  //   this.setCode('000000')
  //   this.setTitle(this.search)
  //   this.$router.push(`/detail/${this.search}`)
  // }
  // private revealTextArea(): void {
  //   this.inputMode = true
  // }
  
  private addInterestGroup(): void {
    this.interetGroups.push({
      title: this.groupTitle,
      icon: 'mdi-star',
      groupItem: []
    })
    this.groupTitle = ''
  }

  private editInterestGroup(title: string): void {
    this.interetGroups = this.interetGroups.filter((interestGroup: InterestGroupModel) => interestGroup.title !== title )
  }

  private push(title: string): void {        
    try{
      const stock = this.stocks.find((stock: StockSimpleModel) => {
        stock.title === title
      }) as StockSimpleModel
      this.setCode(stock.code)
      this.setTitle(title)
      this.$router.push(`/detail/${stock.code}`)
    } catch(e: any) {     
      console.log(e)
    }  
  }

  private inputModeBlur(): void {
    this.inputMode = false
    this.groupTitle = ''
  }


}
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.no-scroll { -ms-overflow-style: none; } 
.no-scroll::-webkit-scrollbar { display:none; }

</style>


