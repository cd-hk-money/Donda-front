<template>
  <v-card
    dark  
  >
    <v-list             
      two-line>
      <v-list-item-group        
        v-model="selected"
        multiple        
      >
        <template v-for="(item, index) in items">            
          <v-list-item  
            class="ranking-content"
             :key="item.code">
            
              <v-list-item-avatar>
                <p class="text-h5 font-weight-bold">{{ index + 1 }}</p>
              </v-list-item-avatar>            
              <v-list-item-content>                
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle                  
                  v-text="item.code"
                ></v-list-item-subtitle>

                
              </v-list-item-content>

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
        <v-btn>
          <v-icon>
            mdi-arrow-down
          </v-icon>
        </v-btn>
      </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { StockSimpleModel } from '@/models/stock'

@Component 
export default class TransList extends Vue {
  private selected: Array<any> = []
  private items: Array<StockSimpleModel> = [
    {
      title: '샘송전자',
      code: '001235',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001236',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001237',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001244',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001284',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001294',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001554',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001004',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001994',
      stock: 999
    },
    {
      title: '샘송전자',
      code: '001774',
      stock: 999
    },
  ]
}
</script>

<style scoped>
.ranking-content {
  height: 82px;
}
</style>