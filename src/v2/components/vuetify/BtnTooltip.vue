<template>
  <v-tooltip 
    :right="right"
    :left="left"
    :top="top"
    :bottom="bottom"
  >
    <template v-slot:activator="{on, attrs}">
      <slot v-on="on" v-bind="attrs" name="button"></slot>
      <slot name="tooltip"></slot>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class  extends Vue {
  @Prop() right!: boolean
  @Prop() left!: boolean
  @Prop() top!: boolean
  @Prop() bottom!: boolean
}
</script>
