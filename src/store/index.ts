import { configureStore } from '@reduxjs/toolkit'
import { useStore } from 'react-redux'
import user, { UserState } from './user'

export interface RootState {
  user: UserState
}

export default configureStore({
  reducer: {
    user,
  },
})
