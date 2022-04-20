<template>
  <v-progress-circular
    :size="size"
    :width="width"
    class="loading"
    :color="color"
    indeterminate
  ></v-progress-circular>     
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CircularLoading extends Vue {
  @Prop({default: 70})
  private size!: number

  @Prop({default: 7})
  private width!: number

  @Prop({default: "cyan"})
  private color!: string
}
</script>