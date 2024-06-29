import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { message } from 'antd'
import { ComponentPropsType } from '@/components/QuestionComponents'
import {
  getComponentInfo,
  getComponentIndexById,
  getComponentHiddenNextSelectId,
  insertComponent,
} from './utils'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  hidden: boolean
  locked: boolean
}

export interface ComponentsState {
  componentList: ComponentInfoType[]
  selectComponentId: string
  copyComponent: ComponentInfoType | null
}

const initialState: ComponentsState = {
  componentList: [],
  selectComponentId: '',
  copyComponent: null,
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
      const newComponentInfo = action.payload

      insertComponent(draft, newComponentInfo)
    }),

    updateComponentProp: produce(
      (
        draft: ComponentsState,
        action: PayloadAction<{ fe_id: string; props: ComponentPropsType }>
      ) => {
        const { fe_id, props } = action.payload
        const componentInfo = getComponentInfo(draft, fe_id)
        if (componentInfo) {
          componentInfo.props = props
        }
      }
    ),

    deleteComponent: produce((draft: ComponentsState) => {
      const index = getComponentIndexById(draft)
      if (index >= 0) {
        draft.componentList.splice(index, 1)
        message.success('删除成功')
      }
    }),

    updateComponentHiddenState: (
      draft: ComponentsState,
      action: PayloadAction<{ fe_id?: string; hidden: boolean }>
    ) => {
      const { fe_id = draft.selectComponentId, hidden } = action.payload

      const selectComponentInfo = getComponentInfo(draft, fe_id)
      const nextSelectId = getComponentHiddenNextSelectId(draft, fe_id)
      draft.selectComponentId = nextSelectId
      if (selectComponentInfo) {
        selectComponentInfo.hidden = hidden
        message.success('隐藏成功')
      }
    },

    toggleComponentLockedState: (draft: ComponentsState) => {
      const selectComponentInfo = getComponentInfo(draft)
      if (selectComponentInfo) {
        selectComponentInfo.locked = !selectComponentInfo.locked
        message.success('切换锁定状态成功')
      }
    },

    copyComponentInfo: (draft: ComponentsState) => {
      const selectComponentInfo = getComponentInfo(draft)
      if (selectComponentInfo) {
        const copyComponent = cloneDeep(selectComponentInfo)
        draft.copyComponent = copyComponent
        message.success('复制成功')
      }
    },

    pasteComponentInfo: (draft: ComponentsState) => {
      const copyComponent = draft.copyComponent
      if (!copyComponent) return
      copyComponent.fe_id = nanoid(5)

      insertComponent(draft, copyComponent)
      message.success('粘贴成功')
    },

    selectPrevComponent: (draft: ComponentsState) => {
      const index = getComponentIndexById(draft)
      if (index > 0) {
        draft.selectComponentId = draft.componentList[index - 1].fe_id
      }
    },

    selectNextComponent: (draft: ComponentsState) => {
      const index = getComponentIndexById(draft)
      if (index >= 0 && index < draft.componentList.length - 1) {
        draft.selectComponentId = draft.componentList[index + 1].fe_id
      }
    },
  },
})

export const {
  resetComponentList,
  setSelectComponentId,
  addComponent,
  updateComponentProp,
  deleteComponent,
  updateComponentHiddenState,
  toggleComponentLockedState,
  copyComponentInfo,
  pasteComponentInfo,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
