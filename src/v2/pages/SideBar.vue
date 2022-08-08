<template>
  <v-sheet           
    permanent                    
    :height="height < 500 ? 'auto' : 'auto'"
  >
    <v-card outlined>
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

      <v-list         
        v-for="(item, i) in itemsV2"
        :key="i"      
      >
        <v-list-group          
          :value="true"          
          v-model="item.active"          
          :append-icon="groupIcon"
          @contextmenu.prevent="showContextMenu(item.title)"                 
        >
          <template v-slot:activator>
            <v-list-item-content>              
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <div v-if="groupIcon === ''">          
                <v-icon>
                  mdi-delete
                </v-icon>
              </div>
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
      </v-list>     
      
      <v-btn  block @click="dialog = true" v-if="!dialog">
        그룹 추가
        <v-icon>mdi-plus</v-icon>
      </v-btn>   
      <v-text-field 
        v-else @blur="dialog = false" class="ml-3 mr-3"
        label="관심종목 그룹명"
        v-model="groupName"
        outlined
        clearable
        @keydown.enter="addgroup(groupName)"
      />      
    </v-card>    
  </v-sheet>    
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
  groupName = ''
  groupIcon = 'mdi-chevron-down'
  dialog = false

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

  $refs!: {
    kiContext: any
  }

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
     
  @InterestStoreModule.State('interestGroups') interestGroups!: IInterestGroup[]
  @InterestStoreModule.Mutation('initInterestGroup') readonly initInterestGroup!: () => void
  @InterestStoreModule.Mutation('addGroup') readonly addGroup!: (group: any) => void
  @InterestStoreModule.Mutation('removeInterestGroup') readonly removeGroup!: (title: string) => void
  
  addgroup (groupName) {
    this.addGroup({
      title: groupName,
      item: []
    })

    this.groupName = ''
  }

  showContextMenu (title: string) { this.removeGroup(title) }

  created () {
    this.initInterestGroup()    
  }

}
</script>