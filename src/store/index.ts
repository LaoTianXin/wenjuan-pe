import { configureStore } from '@reduxjs/toolkit'
import user, { UserState } from './userReducer'
import components, { ComponentsState } from './componentsReducer'
import pageInfo, { PageInfoType } from './pageInfoReducer'

export interface RootState {
  user: UserState
  components: ComponentsState
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user,
    components,
    pageInfo,
  },
})
