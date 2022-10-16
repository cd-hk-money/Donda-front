<template>
  <v-tooltip 
    bottom class="btn-badge"
    color="grey darken-3"
    max-width="550"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn 
        v-on="on"
        v-bind="attrs"
        icon class="btn-badge-btn">
        <v-icon x-small>
          fa-solid fa-circle-question
        </v-icon>
      </v-btn>
    </template>
    <slot name="text"></slot>    
    <slot></slot>
  </v-tooltip>
</template>

<script lang="ts">    
import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class BtnBadge extends Vue {
    @Prop({default: ''}) tooltipMessage!: string
    
  }
</script>

<style>
.btn-badge-btn {
  max-width: 12px; 
  max-height: 12px;
  bottom: 10px;
}

a {
  text-decoration: none;
  font-style: italic;
  font-size: 10px;
  color: white !important;
  opacity: .7;
}

.btn-badge strong {
  color: rgb(64, 224, 208) !important;
}



</style>