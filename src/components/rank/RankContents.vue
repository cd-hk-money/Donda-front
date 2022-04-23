<template>
  <v-card 
    dark
    height="80vh"
  >
    <v-list>      
      <v-list-item-group>
        <v-list-item 
          class="white--text"
          disabled>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">
              종목명
            </v-list-item-title>            
          </v-list-item-content>
          <v-col col="12" xl="6">
            <span class="text-h8 font-weight-bold"> {{type}} </span>        
          </v-col>               
        </v-list-item>
      </v-list-item-group>

      <v-divider></v-divider>
        <v-list-item 
          v-for="(content, i) in contents"
          class="white--text"
          :key="i"
          :to="`detail/${content.code}`"
          replace
        >
          <v-list-item-content>
            <v-list-item-title class="text-h7 font-weight-bold">
              {{ content.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ content.code }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-col col="12" xl="6">
            <span class="text-h8"> ₩{{ content.stock.toLocaleString() }} </span>        
          </v-col>                          
        </v-list-item>                                  
    </v-list>
  
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { StockSimpleModel } from '@/models/stock'

@Component
export default class RankContents extends Vue {
  @Prop({default: []})
  private contents!: Array<StockSimpleModel>

  @Prop({default: ''})
  private type!: string
}
</script>