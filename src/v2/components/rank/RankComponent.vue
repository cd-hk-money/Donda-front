<template>
  <v-card   
    height="auto"    
    class="ml-15 mr-15"
   >
    <v-divider></v-divider>      
    <v-list>
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
            :to="`/detail/${content[1]}`"
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
    </v-list>

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
import { Component, Vue, Prop } from 'vue-property-decorator'
import RankContents from '@/v2/components/rank/RankContents.vue'

import { IMarketRanksContents } from '@/models/stock'

@Component({
  components: {
    RankContents
  }
})
export default class RankComponent extends Vue {


  isUp = false
  @Prop()
  contents!: IMarketRanksContents

  @Prop({default: ''})
  title!: string  

  moreRank () {
    if(this.isUp) this.$emit('seeMore', 10)
    else this.$emit('seeMore', 50)

    this.isUp = !this.isUp
  }

  subContent(title: string, content: number) {
    switch (title) {
      case '시가총액': return ''
      case '상승률': return '+' + content.toLocaleString() + '%'
      case '하락률': return content.toLocaleString() + '%'
      case '거래량': return content.toLocaleString()
    }
  }
}
</script>