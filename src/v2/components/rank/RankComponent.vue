<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RankContents from '@/v2/components/rank/RankContents.vue'

@Component({
  components: {
    RankContents
  }
})
export default class RankComponent extends Vue {
  
}
</script>