<template>
  <v-card   
    height="auto"    
    class="ml-15 mr-15"
    elevation="0"
    outlined
   >
    <v-divider></v-divider>      

    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="tableItem"
      :search="null"
      @click:row="rowClick"
      :items-per-page="contents.length"
    >
      <!-- 순위  -->
      <template v-slot:[`item.rank`]="{ item }">        
        <span class="text-h4 font-weight-bold">
          {{ item.rank }}
        </span>
      </template>
      <!-- 종목 코드 -->
      <template v-slot:[`item.name`]="{ item }">        
        <span class="text-h5">
          {{ item.name }}
        </span>
        <span class="text-h6 grey--text">
          {{ item.code }}
        </span>
      </template>

      <!-- 종가  -->
      <template v-slot:[`item.close`]="{ item }">
        <v-chip label dark>
          <span class="text-h6">
            {{ item.close }}
          </span>
        </v-chip>        
      </template>

      <!-- 변동값 -->
      <template v-slot:[`item.changes`]="{ item }">
        <v-chip
          label
          dark
          :color="item.changes.includes('-') ? 'blue' : 'red'" 
        >
          <span class="text-h6">
            {{ item.changes }}
          </span>          
        </v-chip>        
      </template>

      <!-- 변동률 -->
      <template v-slot:[`item.changes_ratio`]="{ item }">
        <v-chip
          label
          dark
          :color="item.changes_ratio.includes('-') ? 'blue' : 'red'" 
        >
          <span class="text-h6">
            {{ item.changes_ratio }}
          </span>          
        </v-chip>        
      </template>

      <!-- 종가  -->
      <template v-slot:[`item.bookmarked`]="{ item }">
        <v-icon size="30">
          {{ item.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'}}
        </v-icon>
      </template>
      
    </v-data-table>
    <!-- <v-list>
      <v-tooltip 
        v-for="(content, i) in contents"
        :key="i" 
        bottom    
        nudgo-right="100"
        nudge-top="70"
      >
        <template v-slot:activator="{on, bind}">
          <v-list-item 
            link
            :to="`/detail/${content[2]}`"
            v-on="on"
            v-bind="bind"
          >     
            <v-list-item-avatar class="text-h4">
              {{ i + 1 }} 
            </v-list-item-avatar>    
            <v-row class="d-flex align-center justify-end">
              <v-col cols="12" xl="8" md="8" sm="6">
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    {{ content[2] }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ content[1] }}
                  </v-list-item-subtitle>                            
                </v-list-item-content>  
              </v-col>
              <v-col cols="12" xl="2" md="2" sm="3">
                <span class="red--text text-h6 ml-15">  
                    {{ subContent(title, content[6])}} 
                </span>
              </v-col>
              <v-col cols="12" xl="2" md="2" sm="3">
                <span class="text-h5 ml-15">
                  {{ content[4].toLocaleString()}}₩
                </span>            
              </v-col>
            </v-row>      
            <span>              
              <v-icon 
                size="40">mdi-bookmark-outline
              </v-icon>
            </span>
          </v-list-item>
        </template>
        <span class="text-h4"> {{ content[11].toLocaleString() }} </span>
      </v-tooltip>
    </v-list> -->

    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        icon        
        @click="moreRank"
      >
        <v-icon>
          {{ isUp ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down' }}
        </v-icon>
      </v-btn>    
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import RankContents from '@/v2/components/rank/RankContents.vue'
import { IStockModel } from '@/models/stock'
import { namespace } from 'vuex-class'
import { IInterestGroup } from '@/models/interest'

const TABLE_TYPE = ['rank', 'date', 'code', 'name', 'market', 'close', 'changes', 'changes_ratio',
  'open', 'high', 'low', 'volume', 'amount', 'marcap', 'stocks', 'per', 'pbr', 'bookmarked'
  ]

const moneyType = ['close', 'open', 'high', 'low', 'marcap', 'changes']

const InterestStoreModule = namespace('InterestStore')

@Component({
  components: {
    RankContents
  }
})
export default class RankComponent extends Vue {

  // 더보기 버튼 위 아래 유무
  isUp = false

  // V-DATA-TABLE 테이블 컨텐츠
  tableItem: IStockModel[] = []

  // V-DATA-TABLE 테이블 헤더
  headers = [
    { text: '순위', value: 'rank'},
    {
      text: ' 종목명',
      align: 'start',
      filterable: false,
      value: 'name',
    },
    { text: '종가', value: 'close' },
    { text: '저가', value: 'low' },
    { text: '고가', value: 'high' },
    { text: '시가', value: 'open' },
    { text: '거래량', value: 'volume'},
    { text: '변동값', value: 'changes'},
    { text: '변동률', value: 'changes_ratio' },
    { text: '시가총액', value: 'marcap' },    
    { text: '', value: 'bookmarked'}
  ]

  @InterestStoreModule.State('bookmarked')
  bookmarked!: IInterestGroup[]

  @Prop()
  contents!: any

  @Prop({default: ''})
  title!: string  

  @Watch('contents')
  watchContents() {    
    this.$nextTick(() => {
      this.updateTableItem()
    })
  }

  moreRank () {
    if(this.isUp) this.$emit('seeMore', 10)
    else this.$emit('seeMore', 50)
    this.isUp = !this.isUp
  }

  updateTableItem() {
    this.tableItem = this.contents.map((content, i) => 
      [i+1, ...content, this.bookmarked.includes(content[2])].reduce((acc, cur, index) => {
        const key = TABLE_TYPE[index]
        
        if(moneyType.indexOf(key) > -1) acc[key] = cur.toLocaleString() + '₩'
        else if (key === 'changes_ratio') acc[key] = cur > 0 ? '+' + cur + '%' : cur + '%' 
        else acc[key] = cur        
        return acc    
      },{})
    )
  }

  rowClick (target, event) {
    this.$router.push(`/detail/${target.name}`)
  }

  subContent(title: string, content: number) {
    switch (title) {
      case '시가총액': return ''
      case '상승률': return '+' + content.toLocaleString() + '%'
      case '하락률': return content.toLocaleString() + '%'
      case '거래량': return content.toLocaleString()
    }
  }

  mounted () {    
    this.updateTableItem()
  }
}
</script>