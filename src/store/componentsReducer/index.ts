import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { message } from 'antd'
import { ComponentPropsType } from '@/components/QuestionComponents'
import {
  getComponentInfo,
  getComponentIndexById,
  getComponentNextSelectId,
  insertComponent,
} from './utils'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'

export type ComponentInfoType<T extends ComponentPropsType = any> = {
  fe_id: string
  type: string
  title: string
  props: T
  hidden: boolean
  locked: boolean
}

export interface ComponentsState<T extends ComponentPropsType = any> {
  componentList: ComponentInfoType<T>[]
  selectComponentId: string
  copyComponent: ComponentInfoType<T> | null
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
        const nextSelectId = getComponentNextSelectId(draft, draft.selectComponentId)
        draft.selectComponentId = nextSelectId
        draft.componentList.splice(index, 1)
        message.success('删除成功')
      }
    }),

    updateComponentHiddenState: produce(
      (draft: ComponentsState, action: PayloadAction<{ fe_id?: string; hidden: boolean }>) => {
        const { fe_id = draft.selectComponentId, hidden } = action.payload

        const selectComponentInfo = getComponentInfo(draft, fe_id)
        const nextSelectId = getComponentNextSelectId(draft, fe_id)
        draft.selectComponentId = nextSelectId
        if (selectComponentInfo) {
          selectComponentInfo.hidden = hidden
          message.success(hidden ? '隐藏成功' : '取消隐藏成功')
        }
      }
    ),

    toggleComponentLockedState: produce(
      (draft: ComponentsState, action: PayloadAction<{ fe_id: string }>) => {
        const selectComponentInfo = getComponentInfo(draft, action.payload.fe_id)
        if (selectComponentInfo) {
          selectComponentInfo.locked = !selectComponentInfo.locked
          message.success('切换锁定状态成功')
        }
      }
    ),

    copyComponentInfo: produce((draft: ComponentsState) => {
      const selectComponentInfo = getComponentInfo(draft)
      if (selectComponentInfo) {
        const copyComponent = cloneDeep(selectComponentInfo)
        draft.copyComponent = copyComponent
        message.success('复制成功')
      }
    }),

    pasteComponentInfo: produce((draft: ComponentsState) => {
      const copyComponent = draft.copyComponent
      if (!copyComponent) return
      copyComponent.fe_id = nanoid(5)

      insertComponent(draft, copyComponent)
      message.success('粘贴成功')
    }),

    selectPrevComponent: produce((draft: ComponentsState) => {
      const index = getComponentIndexById(draft)
      if (index > 0) {
        draft.selectComponentId = draft.componentList[index - 1].fe_id
      }
    }),

    selectNextComponent: produce((draft: ComponentsState) => {
      const index = getComponentIndexById(draft)
      if (index >= 0 && index < draft.componentList.length - 1) {
        draft.selectComponentId = draft.componentList[index + 1].fe_id
      }
    }),

    changeComponentTitle: produce(
      (draft: ComponentsState, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const componentInfo = getComponentInfo(draft, fe_id)
        if (componentInfo) {
          componentInfo.title = title
        }
      }
    ),

    swapComponentList: produce(
      (draft, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
        const { oldIndex, newIndex } = action.payload
        const originComponentList = draft.componentList
        draft.componentList = arrayMove(originComponentList, oldIndex, newIndex)
      }
    ),
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
  changeComponentTitle,
  swapComponentList,
} = componentsSlice.actions

export default componentsSlice.reducer
