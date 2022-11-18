<template>  
  <v-list-item 
    class="mb-3 news-list-item"
    link
    @click="onClickRedirect(news.url)"
  >
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold news-list-item-title">
        {{ computedContnet.title }} 
      </v-list-item-title>
      
      <v-divider />

      <v-list-item-content class="news-card-content">
        {{ computedContnet.content }}
      </v-list-item-content>

      <v-list-item-action class="news-card-action mt-10 mr-3">
        {{ computedContnet.date}}
      </v-list-item-action>

    </v-list-item-content>

  </v-list-item>
</template>

<script lang="ts">
  import { INewsModel } from '@/models/stock';
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class NewsContentsFactory extends Vue {
    @Prop() news!: INewsModel

    get computedContnet () {
      const splited = this.news.summary.split('|')
      return {
        title: this.news.subject,
        content: splited[0].split('...')[0] + '...',
        date: `
          ${splited[1]?.slice(0, 11)} / 
          ${splited[1]?.slice(11, 16)} / 
          ${splited[0]?.split('...')[splited[0]?.split('...').length - 1]}
        `
      }
    }    

    onClickRedirect(url: string): void {
      window.open(url, '_blank')
    }
  }

</script>

<style scoped>
.news-card-action {
  position: absolute;
  right: 5px;
  bottom: -7px;
  font-size: 13px;
  opacity: .7; 
}

.news-list-item {
  height: 125px !important;    
}

.news-list-item-title {
  transform: all .8s ease;
}

.news-list-item:hover .news-list-item-title {
  color: #00BCD4;
}

.news-card-content {
  opacity: .8;
}

</style>