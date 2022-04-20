<template>
  <v-autocomplete      
    dense            
    flat
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SideBarSearch extends Vue {
}
</script>


