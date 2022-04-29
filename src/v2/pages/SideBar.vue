<template>
  <v-card    
    class="mt-5"    
    height="auto"
    width="256"
    rounded="ml"        
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h7 font-weight-bold">
            내 관심종목 그룹
          </v-list-item-title>
          <v-list-item-subtitle>
            이준하
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"          
          append-icon='mdi-chevron-down'
        >
          <template v-slot:activator>
            <v-list-item-content>              
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template> 

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>

              <v-list-item-subtitle v-text="child.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="yellow">mdi-star</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>          
        </v-list-group>
        <v-speed-dial 
          absolute
          v-model="fab"
          right
          top
          direction="bottom"
          open-on-hover
          transition="scale-transition"
        >
          <template v-slot:activator>
            <v-btn
              elevation="0"
              small
              v-model="fab"              
              fab
            >
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>
          <v-btn
            fab
            dark
            small
            color="green"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="indigo"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
        
      </v-list>
    </v-navigation-drawer>    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { isMobile } from '@/mixins/tools'

@Component({
  components: {

  }
})
export default class SideBar extends Vue {

  private items = [
    {
      action: 'mdi-ticket',
      active: false,
      items: [
        {
          subtitle: '000000',
          title: '관심종목1',
        },
        {
          subtitle: '000111',
          title: '관심종목2',
        },
        {
          subtitle: '000222',
          title: '관심종목3',
        },        
      ],
      title: '관심종목 그룹1'
    },
    {
      action: 'mdi-ticket',
      active: false,
      items: [
        {
          subtitle: '000000',
          title: '관심종목1',
        },
        {
          subtitle: '000111',
          title: '관심종목2',
        },
        {
          subtitle: '000222',
          title: '관심종목3',
        },        
      ],
      title: '관심종목 그룹2'
    },  
    {
      action: 'mdi-ticket',
      active: false,
      items: [
        {
          subtitle: '000000',
          title: '관심종목1',
        },
        {
          subtitle: '000111',
          title: '관심종목2',
        },
        {
          subtitle: '000222',
          title: '관심종목3',
        },        
      ],
      title: '관심종목 그룹3'
    },    
  ]

  private menus = [
    { title: '종목 찾기' },
    { title: '종목 편집' },
  ]
  

  
  private fab = false

  private drawer = false
  private group: boolean | null = null

  private isMobile = isMobile()

  @Watch('group')
  groupWatch() {
    this.group = false
  }
}
</script>