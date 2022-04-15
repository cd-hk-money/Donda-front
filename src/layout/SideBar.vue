<template>
  <v-navigation-drawer
    expand-on-hover
    dark 
    left
    absolute
    bottom    
    floating       
  >
    <v-list>
      <div class="pa-2">
        <v-autocomplete      
          dense            
          flat
          rounded
          solo-inverted
          cache-items   
          ref="autoinput"
          v-model="searchTable"            
          :items="items"
          :search-input.sync="search"
          hide-no-data
          hide-details        
          @keypress.enter="push(search)"
        ></v-autocomplete>
      </div>  
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense
      v-for="(interest, index) in interetGroups"
      :key="index"
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>{{ interest.icon }}</v-icon>
        </v-list-item-icon>          
        <v-list-item-title>{{ interest.title }}</v-list-item-title>
          <v-btn icon>
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
      </v-list-item>     
      
    </v-list>  

    <v-divider></v-divider>
    <v-list>
      <div  
        v-if="!inputMode"
        class="pa-2">
        <v-btn 
          v-if="!inputMode"
          class="pa-2"
          @click="inputMode=true"
          icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>   
      <v-text-field        
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

const StockStoreModule = namespace('StockStore')

@Component
export default class SideBar extends Vue {

  @StockStoreModule.Action('todayMarket')
  private readonly requestTodayMarket!: () => void

  @StockStoreModule.State('searchTable')
  private searchTable!: Array<string>

  @StockStoreModule.Mutation('setCode')
  // eslint-disable-next-line no-unused-vars
  private setCode!: (code: string) => void

  @StockStoreModule.Mutation('setTitle')
  // eslint-disable-next-line no-unused-vars
  private setTitle!: (title: string) => void

  // 검색창 
  private search: any = null

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

  private push(): void {
    this.setCode('000000')
    this.setTitle(this.search)
    this.$router.push(`/detail/${this.search}`)
  }

  private revealTextArea(): void {
    this.inputMode = true
  }
  
  private addInterestGroup(): void {
    this.interetGroups.push({
      title: this.groupTitle,
      icon: 'mdi-star',
      groupItem: []
    })
    this.groupTitle = ''
  }
  
  private inputModeBlur(): void {
    this.inputMode = false
    this.groupTitle = ''
  }

  created() {
    this.requestTodayMarket()
  }
}
</script>
