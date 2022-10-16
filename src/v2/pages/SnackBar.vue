<template>
  <v-snackbar 
    v-model="SnackBar" timeout="3000"
    @blur="updateState({
      snackBar: false,
      snackBarMessage: ''
    })"  
  >
    {{ snackBarMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="error"
        text
        v-bind="attrs"
        @click="updateState({
          snackBar: false,
          snackBarMessage: ''
        })"          
      >
        닫기
      </v-btn>
    </template>
  </v-snackbar>  
</template>

<script lang="ts">
  import { IUpdateStateModel } from '@/models/payload';
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class'

  const InterestStoreModule = namespace('InterestStore')

  @Component
  export default class SnackBar extends Vue {
    get SnackBar () {
      return this.snackBar
    }

    set SnackBar (value) {
      this.updateState({
        snackBar: value
      })
    } 

    @InterestStoreModule.State('snackBar') snackBar!: boolean
    @InterestStoreModule.Mutation('snackBarClose') snackBarClose!: () => void
    @InterestStoreModule.State('snackBarMessage') snackBarMessage!: string
    @InterestStoreModule.Mutation('updateState') updateState!: (payload: IUpdateStateModel) => void
  }
</script>

<style scoped>

</style>