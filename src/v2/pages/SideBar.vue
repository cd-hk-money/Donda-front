<template>
  <v-navigation-drawer 
    permanent     
    width="100%"      
    height="100"
    :class="mobile ? 'ml-5 mt-5' : ''"
    v-show="!mobile"    
  >
    <v-sheet           
      permanent      
      height="auto"
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
          v-for="(item, i) in computedInterestStore"
          :key="i"      
        >
          <v-list-group          
            :value="true"          
            v-model="item.active"          
            :append-icon="groupIcon"
            @contextmenu.prevent="[
              removeDialog = true,
              dialogTitle = item.title
            ]"
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
              @click.left="$router.push(`/detail/${child.title}`)"            
              @contextmenu.prevent="removeInterestGroupItem({
                groupTitle: item.title,
                itemTitle: child.title
              })"           
            >
              <v-list-item-content >
                <v-list-item-title v-text="child.title"></v-list-item-title>
  
                <v-list-item-subtitle v-text="child.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
  
              <v-list-item-action class="v-list-item-action-close">
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
        
        <v-btn 
          v-if="!dialog"
          block @click="dialog = true" 
        >
          관심종목 그룹 추가
          <v-icon>mdi-plus</v-icon>
        </v-btn>   
  
        <v-text-field 
          v-else 
          class="ml-3 mr-3"
          label="관심종목 그룹명"
          v-model="groupName"
          outlined autofocus clearable
          @blur="dialog = false" 
          @keydown.enter="[
            addGroup({
              title: groupName,
              item: []
            }), 
            updateState({
              snackBarMessage: '관심종목 그룹 추가 완료',
              snackBar: true
            }),
            groupName = ''
          ]"
        />      
      </v-card> 
  
    <v-dialog 
        max-width="35vh"                   
        max-height="150"
        v-model="removeDialog"      
        overlay-opacity="0.2"      
      >
        <v-card outlined>
          <v-card-title> 관심종목 그룹 삭제 </v-card-title>
  
          <v-divider></v-divider>
  
          <v-card-subtitle class="pt-3 text-center">
            {{ dialogTitle }} 을(를) 삭제하시겠습니까? 
            <div class="red--text" style="{font-size: 8px}">
              하위 항목은 전부 삭제됩니다.
            </div>
          </v-card-subtitle>
          
          <v-card-text class="d-flex justify-center">          
            <v-btn
              color="error"
              text
              @click="[
                removeDialog = false, 
                removeGroup(dialogTitle), 
                updateState({
                  snackBarMessage: '관심종목 그룹 삭제 완료',
                  snackBar: true
                })
              ]"
            > 예
            </v-btn>
  
            <v-btn
              color="primary"
              text
              @click="removeDialog = false"
            > 아니오
            </v-btn>
          </v-card-text>
  
        </v-card>
      </v-dialog>
    </v-sheet>    
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { IInterestGroup } from '@/models/interest'
import { IUpdateStateModel } from '@/models/payload'

const InterestStoreModule = namespace('InterestStore')

@Component
export default class SideBar extends Vue {

  fab = false
  removeDialog = false
  dialog = false
  dialogTitle = ''
  groupName = ''
  groupIcon = 'mdi-chevron-down'
        
  @InterestStoreModule.State('interestGroups') interestGroups!: IInterestGroup[]
  @InterestStoreModule.Getter('computedInterestStore') computedInterestStore!: any
  @InterestStoreModule.Mutation('initInterestGroup') readonly initInterestGroup!: () => void
  @InterestStoreModule.Mutation('addGroup') readonly addGroup!: (group: any) => void
  @InterestStoreModule.Mutation('removeInterestGroup') readonly removeGroup!: (title: string) => void
  @InterestStoreModule.Mutation('updateState') readonly updateState!: (payload: IUpdateStateModel) => void
  @InterestStoreModule.Mutation('removeInterestGroupItem') readonly removeInterestGroupItem!: ({groupTitle, itemTitle}: {groupTitle: string, itemTitle: string}) => void

  get mobile () {
    return this.$vuetify.breakpoint.name === 'xs'
  }

  
  created () {
    this.initInterestGroup()    
  }

}
</script>

<style scoped>
.v-list-item-action-close {
  z-index: 100 !important;
}


</style>