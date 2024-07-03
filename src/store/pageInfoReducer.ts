import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'

export type PageInfoType = {
  title: string
  desc: string
  css: string
  js: string
}

const initialState: PageInfoType = {
  title: '',
  desc: '',
  css: '',
  js: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfoReducer(state, action: PayloadAction<PageInfoType>) {
      return { ...state, ...action.payload }
    },

    changePageTitle: produce((draft, action: PayloadAction<{ title: string }>) => {
      draft.title = action.payload.title
    }),
  },
})

export const { resetPageInfoReducer, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
