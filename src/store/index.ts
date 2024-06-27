import { configureStore } from '@reduxjs/toolkit'
import user, { UserState } from './userReducer'
import components, { ComponentsState } from './componentsReducer'

export interface RootState {
  user: UserState
  components: ComponentsState
}

export default configureStore({
  reducer: {
    user,
    components,
  },
})
