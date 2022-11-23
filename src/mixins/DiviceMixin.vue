<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DiviceMixin extends Vue {
  public get isMobile (): boolean {
    return this.$vuetify.breakpoint?.name === 'xs'
  }

  public get screenType () {
    return this.$vuetify.breakpoint?.name
  }
}

</script>