<template>
  <v-date-picker
    dark
    v-model="dates"
    range
  ></v-date-picker>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DatePicker extends Vue {
  private dates = ['2022-04-11', '2022-04-16']

  get dateRangeText (): string {
    return this.dates.join(' ~ ')
  }
}
</script>