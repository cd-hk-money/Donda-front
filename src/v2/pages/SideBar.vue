<template>
    <v-card    
      class="mt-5"    
      height="auto"
      width="256"
      rounded="xl"        
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
                <v-btn 
                  x-small
                  icon
                >
                  <v-icon>fa-edit</v-icon>
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
            <v-tooltip
              v-for="menu in menus"
              :key="menu.icon"
              left
            >
              <template v-slot:activator="{ on, attrs}">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  :color="menu.color"
                  fab
                  dark
                  small
                  @click="menu.click"
                >
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ menu.tooltip }}</span>
            </v-tooltip>
          </v-speed-dial>
        
        </v-list>        
      </v-navigation-drawer>    
    </v-card>
      
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { isMobile } from '@/mixins/tools'
import { IMenu } from '@/v2/pages/MenuBar.vue'

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

  private menus: Array<IMenu> = [
    {
      icon: 'mdi-pencil',
      tooltip: '그룹 편집',
      color: 'green',
      click: () => {
        console.log('편집')
      }
    },
    {
      icon: 'mdi-plus',
      tooltip: '그룹 추가',
      color: 'indigo',
      click: () => {
        console.log('추가')
      }
    },
    {
      icon: 'mdi-delete',
      tooltip: '그룹 삭제',
      color: 'red',
      click: () => {
        console.log('삭제')
      }
    }
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