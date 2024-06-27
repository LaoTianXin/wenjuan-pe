import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { ComponentPropsType } from '@/components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export interface ComponentsState {
  componentList: ComponentInfoType[]
  selectComponentId: string
}

const initialState: ComponentsState = {
  componentList: [],
  selectComponentId: '',
}

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    resetComponentList: produce((draft, action: PayloadAction<ComponentInfoType[]>) => {
      draft.componentList = action.payload
    }),

    setSelectComponentId: produce((draft, action: PayloadAction<string>) => {
      draft.selectComponentId = action.payload
    }),
  },
})

export const { resetComponentList, setSelectComponentId } = componentsSlice.actions

export default componentsSlice.reducer
