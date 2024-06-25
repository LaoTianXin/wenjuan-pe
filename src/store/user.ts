import { setToken, getToken, removeToken } from '@/utils/user-token'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  username: string
  nickname: string
  token: string
}

const initialState: UserState = {
  username: '',
  nickname: '',
  token: getToken() || '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer(state, action: PayloadAction<Pick<UserState, 'token'>>) {
      setToken(action.payload.token)

      return Object.assign(state, action.payload)
    },

    setUserInfoReducer(state, action: PayloadAction<Pick<UserState, 'username' | 'nickname'>>) {
      return Object.assign(state, action.payload)
    },

    logoutReducer() {
      removeToken()
      return initialState
    },
  },
})

export const { loginReducer, logoutReducer, setUserInfoReducer } = userSlice.actions

export default userSlice.reducer
