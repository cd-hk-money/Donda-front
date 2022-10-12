<template>
  <v-sheet
    class="stock-indicator-detail-content"
    @click="expand = !expand"
  >
    <v-card-title class="text-h4 stock-indicator-detail-content-title">
      {{ upperType }}
      <v-chip v-if="quarter" small class="ml-3"> 분기 </v-chip>
      <v-chip small class="ml-3">
        <v-tooltip top >
          <template v-slot:activator="{on}">
            <v-icon 
              v-on="on"
              :color="iconColor"                  
            >{{ icon }}</v-icon>        
          </template>  
          <span> 투자가치가 {{ tooltipMessage }} </span> 
        </v-tooltip>
      </v-chip>
    </v-card-title>

    <v-card-subtitle :class="['text-h6', getStrongFontColorClass]">
      <span>
        <slot name="title"></slot>
      </span>
    </v-card-subtitle>

    <v-card-text :class="['grey--text', getStrongFontColorClass]">
      <slot name="description"></slot>
    </v-card-text>

    <v-expand-transition>
      <v-card v-if="expand" elevation="0">
        <StockIndicatorBarChart 
          class="ml-3"
          :type="upperType"
          :chartData="chartData"
          :sector="sectorData"
          :height="100"
        />
        <v-divider />
  
        <v-card-text :class="['grey--text mt-1', getStrongFontColorClass]">
          <div>
            <slot name="compareSector"></slot>
          </div>
      
          <div class="d-flex flex-wrap">
            <slot name="information"></slot>
          </div>
        </v-card-text>
      </v-card>


      
    </v-expand-transition>


  </v-sheet>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import StockIndicatorBarChart from '@/v2/components/detail/StockIndicatorBarChart.vue';

  @Component({
    components: {
      StockIndicatorBarChart
    }
  })
  export default class  extends Vue {
    @Prop() indicatorType!: string    
    @Prop({default: true}) quarter!: boolean
    @Prop({default: {}}) data!: any
    @Prop() iconColor!: string
    @Prop() icon: string
    @Prop() chartData!: any
    @Prop() sectorData!: any
    @Prop() tooltipMessage!: boolean
    
    expand = false

    get upperType () { 
      return this.indicatorType.toUpperCase()
    }

    get getStrongFontColorClass () {
      return this.$vuetify.theme.dark ? 'strong-white' : 'strong-black'
    }
  }
</script>

<style scoped>

</style>