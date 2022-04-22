<template>
  <v-card    
    dark
    elevation="0"    
    :color="color"
    max-height="20%"
    min-height="20%"
  >
    <v-card-text>      
      <v-row>        
        <v-col cols="12" sm="auto">
          <span class="white--text ml-3 text-h3 font-weight-bold">
            {{ desc.market }} 
          </span>
          <span class="text-h5 ">
            {{ desc.code }}
          </span>                
        </v-col>      
        <v-col cols="12" sm="auto">     
          <!-- <v-btn 
            class="ma-2"
            outlined
            depressed
            @click="clickDetail"
          >
            자세히
          </v-btn> -->
            <div class="text-center">
            <v-dialog              
              v-model="dialog"
              width="80vh"
            >
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  class="ma-2 cyan"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  right
                >                  
                </v-btn>
              </template> -->

              <v-card rounded="xl">
                <v-card-title>
                  {{desc.market}}
                </v-card-title>

                <v-card-text>
                  <v-sheet
                    class="grey lighten-2"                    
                    max-height="10%"
                    rounded="xl"
                  >
                   
                  </v-sheet>
                </v-card-text>

                <v-divider></v-divider>

              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-card-text>    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop }  from 'vue-property-decorator'

// models
import { MarketDescModel } from '@/models/market'

@Component
export default class MarketDesc extends Vue {

  @Prop({
    default: () => {
      return {
        market: '시장이름',
        close: '종가',
        trans: '변화량' 
      }
    }
  }) private desc!: MarketDescModel
  @Prop({ default: 'white'}) private color!: string
  @Prop({ default:'코드'}) private code!: string

  private reveal = false
  private dialog = false

}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}  
</style>