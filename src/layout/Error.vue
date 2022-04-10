<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      잘못된 접근입니다.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
 
@Component
export default class Error extends Vue {
  private snackbar = true
}
</script>