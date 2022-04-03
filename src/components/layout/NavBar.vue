<template>
  <v-card
    elevation="12"
    width="256"
    rounded="xl"
  >
    <v-navigation-drawer
      floating
      permanent
    >
      <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
  private items = [
    { title: '관심종목 그룹1', icon: 'mdi-view-dashboard' },
    { title: '관심종목 그룹2', icon: 'mdi-forum' },
    { title: '관심종목 그룹3', icon: 'mdi-view-dashboard' },
    { title: '관심종목 그룹4', icon: 'mdi-forum' },
  ]
}

</script>