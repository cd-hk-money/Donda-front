<template>
  <v-card   
    height="auto"    
    class="ml-15 mr-15"
    rounded="xl"
      >
    <v-card-title class="text-h4 d-flex justify-center font-weight-bold">
      {{ type.toUpperCase() }}
    </v-card-title>    

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
              <v-col cols="12" xl="10" md="8" sm="6">
                <v-list-item-content>
                  <v-list-item-title class="text-h5">
                    {{ content[1] }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ content[0] }}
                  </v-list-item-subtitle>                            
                </v-list-item-content>  
              </v-col>
              <v-col cols="12" xl="1" md="2" sm="3">
                <span 
                  class="red--text text-h6"
                  v-if="type !== 'marcap'">  
                    +{{ content[3].toLocaleString()}} % 
                </span>
              </v-col>
              <v-col cols="12" xl="1" md="2" sm="3">
                <span class="text-h5">
                  {{ content[2].toLocaleString()}}
                </span>            
              </v-col>
            </v-row>      
            <span>              
              <v-icon 
                class="ml-5"
                size="40">mdi-bookmark-outline
              </v-icon>
            </span>
          </v-list-item>
        </template>
        <span class="text-h4"> {{ content[3].toLocaleString() }} </span>
      </v-tooltip>
    </v-list>

    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        icon        
        @click="moreRank"
      >
        <v-icon>
          fa-solid fa-caret-down
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
  @Prop()
  contents!: IMarketRanksContents

  @Prop({default: ''})
  type!: string  

  moreRank () {
    this.$emit('seeMore')
  }
}
</script>