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
    resetComponentList: produce(
      (draft: ComponentsState, action: PayloadAction<ComponentInfoType[]>) => {
        draft.componentList = action.payload
      }
    ),

    setSelectComponentId: produce((draft: ComponentsState, action: PayloadAction<string>) => {
      draft.selectComponentId = action.payload
    }),

    addComponent: produce((draft: ComponentsState, action: PayloadAction<ComponentInfoType>) => {
      let insertIndex: number = draft.componentList.length
      const newComponentInfo = action.payload
      if (!newComponentInfo) return
      if (draft.selectComponentId) {
        const index = draft.componentList.findIndex(item => item.fe_id === draft.selectComponentId)
        if (index >= 0) {
          insertIndex = index + 1
        }
      }
      draft.componentList.splice(insertIndex, 0, newComponentInfo)
      draft.selectComponentId = newComponentInfo.fe_id
    }),

    updateComponentProp: produce(
      (
        draft: ComponentsState,
        action: PayloadAction<{ fe_id: string; props: ComponentPropsType }>
      ) => {
        const { fe_id, props } = action.payload
        const componentInfo = draft.componentList.find(item => item.fe_id === fe_id) || null
        if (componentInfo) {
          componentInfo.props = props
        }
      }
    ),
  },
})

export const { resetComponentList, setSelectComponentId, addComponent, updateComponentProp } =
  componentsSlice.actions

export default componentsSlice.reducer
