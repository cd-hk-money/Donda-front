// 뉴스 레이아웃

<template>
  <v-card    
    elevation-0
    dark
    min-height="auto"
  >
    <v-card-title>
      
    </v-card-title>

    <v-spacer></v-spacer>
    
    <v-btn 
      right
      icon 
      @click="show = !show">
      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>

    <v-expand-transition> 
      <div v-show="show">
          <v-divider></v-divider> 
          <v-card-text>
            뉴스 더보기
          </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class News extends Vue {
  private show = false
}
</script>