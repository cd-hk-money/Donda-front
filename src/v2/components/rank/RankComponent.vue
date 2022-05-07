<template>
  <v-card 
    class="mt-5 ml-5"
    height="100%"
    rounded="xl"
    width="94%"
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
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ content[1] }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ content[0] }}
              </v-list-item-subtitle>                            
            </v-list-item-content>        
            <span class="text-h5">
              {{ content[2].toLocaleString()}} ₩
            </span>
          </v-list-item>
        </template>
        <span class="text-h4"> {{ content[3].toLocaleString() }} </span>
      </v-tooltip>
    </v-list>

    <v-divider></v-divider>
    <v-card-actions class="text-h7 d-flex justify-end">
      기준일 : ?? 
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
}
</script>