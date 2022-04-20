<template>   
  <v-card 
    class="mt-2 grey darken-3"    
    rounded="xl"
    max-width="100%"
    max-height="52vh"        
  >  
      <v-list two-line>
      <v-list-item>        
        <v-list-item-content>
          <v-list-item-title>이준하</v-list-item-title>
          <v-list-item-subtitle>ruddud1123@naver.com</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-dialog
            v-model="dialog"
            max-width="30%"
            min-height="100%"
          >        
            <template v-slot:activator="{ on, attrs }">        
              <v-btn          
                color="white"   
                elevation="0"
                v-bind="attrs"         
                v-on="on"  
                small          
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn          
                color="white"    
                elevation="0"
                v-bind="attrs"         
                v-on="on"            
                small
              >
                <v-icon>mdi-playlist-edit</v-icon>
              </v-btn>
            </template>

            <v-card   
              rounded="xl"
              dark
              height="100%">
              <v-card-title class="text-h6 font-weight-bold cyan--text">
                기업명, 코드로 종목을 찾아보세요.
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-autocomplete      
                  autofocus
                  dark              
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
              </v-card-text>

              <v-spacer></v-spacer>

              <v-card-text>
                이런 종목은 어떠세요?
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-list-item-action>
      </v-list-item>    
    </v-list> 
    <v-carousel      
      class="grey darken-3"        
      cycle
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      show-arrows-on-hover      
      height="44vh"
    >    
      <v-carousel-item        
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"          
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>      
    </v-carousel>  
   
  </v-card>   
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component 
export default class HomeList extends Vue {
  private full = false

  private colors = [
    'green',
    'secondary',
    'yellow darken-4',
    'red lighten-2',
    'orange darken-1',
  ]
  
  private slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',    
  ]

  private cycle = false
}
</script>