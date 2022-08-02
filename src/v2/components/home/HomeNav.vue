<template>
  <v-card 
    class="ml-5 mr-5" 
    outlined    
    elevation-0
    height="470"
    width="94%"        
  >
    <v-card-title class="donda-title">
      소개 문구..
    </v-card-title>

  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeNav extends Vue {

}

</script>

<style lang="scss" scoped>
.donda-title {
  font-size: 50px;
  line-height: 50px;
}
</style>