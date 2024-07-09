import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  _id: string
  title: string
  desc: string
  css: string
  js: string
  isPublished: boolean
}

const initialState: PageInfoType = {
  _id: '',
  title: '',
  desc: '',
  css: '',
  js: '',
  isPublished: false,
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfoReducer(state, action: PayloadAction<PageInfoType>) {
      return { ...state, ...action.payload }
    },

    changePageTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title
    },
  },
})

export const { resetPageInfoReducer, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
