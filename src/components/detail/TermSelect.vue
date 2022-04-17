<template>
  <v-row
    align="center"
    justify="start"
  >  
    <v-col cols="12" sm="6" md="6" lg="9">    
      <v-btn-toggle     
        class="pl-16 ml-5"
        borderless
        color="cyan darken-1"
      > 
        <v-dialog
          v-model="dialog"
          width="auto"
        >
          <template v-slot:activator="{ on, attrs }">    
            <v-btn  
              class="mr-auto"
              v-bind="attrs"
              v-on="on"
              icon
              small
            >
              <v-icon>mdi-calendar</v-icon>
            </v-btn> 
          </template>

          <v-card dark>    
            <v-date-picker          
              v-model="dates"
              range
            ></v-date-picker>
            <v-divider></v-divider>
            <div class="text-center">
              <v-btn                          
                class="ma-1"
                color="cyan darken-1"
                @click="toggle(3)"
              >
                확인
              </v-btn>
              <v-btn
                class="ma-1"
                color="error"
                @click="dialog = false"
              >
                취소
              </v-btn>
            </div>          
          </v-card>
        </v-dialog>    
            
        <v-btn  
          bottom
          small
          v-for="(menu, index) in menus"
          :key="index"             
          class=""
          @click="toggle(index)"      
        > 
          {{ menu.text}}        
        </v-btn>    
      </v-btn-toggle>
    </v-col>
    <v-col cols="12" sm="auto" md="auto" lg="3">
      <div class="mr-7 pr-3">
        <span class="font-weight-bold cyan--text"> 2022-04-07 ~ 2022-04-15</span>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DatePicker from '@/components/detail/DatePickers.vue'

@Component({
  components: {
    DatePicker
  }
}) 
export default class TermSelect extends Vue {
  private dialog = false
  private menus: {icon: string, text: string}[] = [
    {
      icon: 'mdi-align-center',
      text: '분기'
    },
    {
      icon: 'mdi-format-align-left',
      text: '연간'
    },    
  ]

  private toggle(index: number) {    
    this.$emit('toogle', index)
    this.dialog = false
  }

  private dates = ['2022-04-11', '2022-04-16']

  get dateRangeText (): string {    
    return this.dates.join(' ~ ')
  }
}
</script>