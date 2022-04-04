<template>
  <v-card
    dark
    class="mx-auto"    
  >
    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="white--text"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component 
export default class TransList extends Vue {
  private selected: Array<any> = [2]
  private items: Array<any> = [
    {
      action: '15 min',
      headline: 'Brunch this weekend?',
      subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      title: 'Ali Connors',
    },
    {
      action: '2 hr',
      headline: 'Summer BBQ',
      subtitle: `Wish I could come, but I'm out of town this weekend.`,
      title: 'me, Scrott, Jennifer',
    },
    {
      action: '6 hr',
      headline: 'Oui oui',
      subtitle: 'Do you have Paris recommendations? Have you ever been?',
      title: 'Sandra Adams',
    },
    {
      action: '12 hr',
      headline: 'Birthday gift',
      subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
      title: 'Trevor Hansen',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    }    
  ]
}
</script>