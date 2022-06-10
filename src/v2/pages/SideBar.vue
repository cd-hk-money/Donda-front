<template>
  <div class="mr-10">
    <v-navigation-drawer 
      :class="['ml-5', height < 500 ? 'mt-15' : 'mt-5']"     
      permanent             
      width="100%" 
      :height="height < 500 ? 'auto' : 'auto'"
    >
      <v-card    
        height="auto"
        width="100%"        
        outlined        
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h7 text font-weight-bold">
              내 관심종목 그룹
            </v-list-item-title>
            <v-list-item-subtitle>
              이준하
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list two-line>
          <v-list-group
            active-class="secondary" 
            :value="true"
            v-for="(item, i) in itemsV2"
            :key="i"
            v-model="item.active"          
            append-icon='mdi-chevron-down'
          >
            <template v-slot:activator>
              <v-list-item-content>              
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template> 

            <v-list-item
              v-for="(child, i) in item.items"
              :key="i"              
              link
              replace
              :to="`/detail/${child.title}`"
            >
              <v-list-item-content >
                <v-list-item-title v-text="child.title"></v-list-item-title>

                <v-list-item-subtitle v-text="child.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn 
                  x-small
                  icon                  
                >
                  <v-icon>fa-regular fa-x</v-icon>
                </v-btn>
              </v-list-item-action>                    
            </v-list-item> 
          </v-list-group>

          <v-speed-dial 
            fixed
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
                x-small
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
                  x-small
                  @click="menu.callback"
                >
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ menu.tooltip }}</span>
            </v-tooltip>
          </v-speed-dial>        
      </v-list>        
    </v-card>
  </v-navigation-drawer>    

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { isMobile } from '@/mixins/tools'
import { IMenu } from '@/v2/pages/MenuBar.vue'
import { IInterestGroup, IInterestGroupItem } from '@/models/interest'

const InterestStoreModule = namespace('InterestStore')

@Component({
  components: {

  }
})
export default class SideBar extends Vue {

  // 그룹 편집메뉴 선택 다이어로그 
  fab = false

  // 디폴트 관심종목 그룹
  items = [
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
          subtitle: '068290',
          title: '삼성출판사',
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

  // 관심종목 그룹
  get itemsV2 () {
    return this.interestGroups.map((group: IInterestGroup) => ({
      title: group.title,
      action: 'mdi-ticket',
      active: false,
      items: group.item.map((item: IInterestGroupItem) => ({
        title: item.title,
        subtitle: item.code
      }))
    })) 
  }

  // grid별 높이
  get height () {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 220
      case 'sm': return 400
      case 'md': return 500
      case 'lg': return 600
      case 'xl': return 800    
    }
    return 800
  }

  // 그룹 메뉴
  menus: IMenu[] = [
    {
      icon: 'mdi-pencil',
      tooltip: '그룹 편집',
      color: 'green',
      callback: () => {
        console.log('편집')
      }
    },
    {
      icon: 'mdi-plus',
      tooltip: '그룹 추가',
      color: 'indigo',
      callback: () => {
        console.log('추가')
      }
    },
    {
      icon: 'mdi-delete',
      tooltip: '그룹 삭제',
      color: 'red',
      callback: () => {
        console.log('삭제')
      }
    }
  ]
   
  @InterestStoreModule.State('interestGroups')
  interestGroups!: IInterestGroup[]

  @InterestStoreModule.Mutation('initInterestGroup')
  readonly initInterestGroup!: () => void

  created () {
    this.initInterestGroup()    
  }
}
</script>