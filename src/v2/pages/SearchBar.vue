<template>
  <v-autocomplete                   
    class="navbar__autocomplete"        
    v-model="searchs"            
    :items="items"
    :search-input.sync="search"
    color="black"          
    autofocus
    hide-details
    hide-no-data
    solo-inverted
    cache-items   
    placeholder="종목명을 입력하세요."
    validate-on-blur
    item-text="name"
    item-value="id"
    @blur="onBlur"
    @keypress.enter="pushDetail(search)"
    @keydown.esc="onBlur"
  >
    <template v-slot:item="{ item }">        
      <v-list-item-content>
        <v-list-item-title v-text="item" />
        <v-list-item-subtitle v-text="codeTitleMapping[item][0]" />
      </v-list-item-content>
    </template>
  </v-autocomplete>   
</template>

<script lang="ts">
  import StoreMixin from '@/mixins/StoreMixin.vue';
  import { StockSimpleModel } from '@/models/stock';
  import { getStock } from '@/store/payload';
  import { Component, Watch } from 'vue-property-decorator';

  @Component
  export default class SaerchBar extends StoreMixin {

    searchs = ''
    search: null | string = null
    loading = false
    items: string[] = []

    onBlur () {
      this.$emit('searchBarBlur')
    }
    
    pushDetail(item) {
      this.onBlur()
      if(this.$route.fullPath === item) return

      this.callRequest(getStock(item))    
      this.$router.push(`/detail/${this.codeTitleMapping[item]}`); 
      (document.activeElement as HTMLElement).blur()      
    }

    @Watch("search")
    watchSearch(val: unknown) {
      if(!val) return
      val && val !== this.searchTable && this.querySelections(val as string)
    }  

    querySelections(val: string) {
      let timeout = 0
      this.loading = true
      window.clearTimeout(timeout)

      setTimeout(() => {
        this.items = this.searchTable.map((s: StockSimpleModel) => s.title).filter(e => {        
          return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1          
        })

        this.loading = false
      }, 500)    
    }
  }
</script>

<style scoped>
.navbar__autocomplete {
  max-width: 400px;  
  min-width: 168px;
  margin-right: 15px;
  overflow: visible;
}
</style>