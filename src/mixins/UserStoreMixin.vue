<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class';
  import { StoreState, User } from '@/store/UserStore'
  import { IUpdateStateModel } from '@/models/payload';
import { IUserInterestGroupItem } from '@/models/interest';

  const UserStoreModule = namespace('UserStore')
  const InterestStoreModule = namespace('InterestStore')
  
  @Component
  export default class UserStoreMixin extends Vue {
    @InterestStoreModule.Mutation('updateState') readonly updateState!: (payload: IUpdateStateModel) => void    
    @UserStoreModule.State('signUpState') signUpState!: StoreState
    @UserStoreModule.State('loginState') loginState!: StoreState
    @UserStoreModule.State('user') user!: User

    @UserStoreModule.Mutation('updateState') readonly updateUserState!: (payload: IUpdateStateModel) => void

    @UserStoreModule.Action('trySignUp') trySignUp!: (payload: { username: string, nickname: string, email: string, password: string }) => Promise<void>
    @UserStoreModule.Action('tryLogin') tryLogin!: (paylaod: { username: string, password: string}) => Promise<void>
    @UserStoreModule.Action('tryLogout') tryLogout!: () => void

    @InterestStoreModule.State('userInterests') userInterests!: IUserInterestGroupItem[]
    @InterestStoreModule.Mutation('addGroup') readonly addGroup!: (group: any) => void
    @InterestStoreModule.Mutation('setUserInterestAlarm') setUserInterestAlarm!: (code: string) => void
    @InterestStoreModule.Mutation('removeInterestGroupItem') readonly removeInterestGroupItem!: ({groupTitle, itemTitle}: {groupTitle: string, itemTitle: string}) => void  
    @InterestStoreModule.Getter('computedInterestStore') computedInterestStore!: any
  }
</script>