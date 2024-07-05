import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    resetComponentList: (state: ComponentsState, action: PayloadAction<ComponentInfoType[]>) => {
      state.componentList = action.payload
    },
    setSelectComponentId: (state: ComponentsState, action: PayloadAction<string>) => {
      state.selectComponentId = action.payload
    },

    addComponent: (state: ComponentsState, action: PayloadAction<ComponentInfoType>) => {
      const newComponentInfo = action.payload

      insertComponent(state, newComponentInfo)
    },

    updateComponentProp: (
      state: ComponentsState,
      action: PayloadAction<{ fe_id: string; props: ComponentPropsType }>
    ) => {
      const { fe_id, props } = action.payload
      const componentInfo = getComponentInfo(state, fe_id)
      if (componentInfo) {
        componentInfo.props = props
      }
    },
    deleteComponent: (state: ComponentsState) => {
      const index = getComponentIndexById(state)
      if (index >= 0) {
        const nextSelectId = getComponentNextSelectId(state, state.selectComponentId)
        state.selectComponentId = nextSelectId
        state.componentList.splice(index, 1)
        message.success('删除成功')
      }
    },

    updateComponentHiddenState: (
      state: ComponentsState,
      action: PayloadAction<{ fe_id?: string; hidden: boolean }>
    ) => {
      const { fe_id = state.selectComponentId, hidden } = action.payload

      const selectComponentInfo = getComponentInfo(state, fe_id)
      const nextSelectId = getComponentNextSelectId(state, fe_id)
      state.selectComponentId = nextSelectId
      if (selectComponentInfo) {
        selectComponentInfo.hidden = hidden
        message.success(hidden ? '隐藏成功' : '取消隐藏成功')
      }
    },
    toggleComponentLockedState: (
      state: ComponentsState,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const selectComponentInfo = getComponentInfo(state, action.payload.fe_id)
      if (selectComponentInfo) {
        selectComponentInfo.locked = !selectComponentInfo.locked
        message.success('切换锁定状态成功')
      }
    },
    copyComponentInfo: (state: ComponentsState) => {
      const selectComponentInfo = getComponentInfo(state)
      if (selectComponentInfo) {
        const copyComponent = cloneDeep(selectComponentInfo)
        state.copyComponent = copyComponent
        message.success('复制成功')
      }
    },

    pasteComponentInfo: (state: ComponentsState) => {
      const copyComponent = state.copyComponent
      if (!copyComponent) return
      copyComponent.fe_id = nanoid(5)

      insertComponent(state, copyComponent)
      message.success('粘贴成功')
    },

    selectPrevComponent: (state: ComponentsState) => {
      const index = getComponentIndexById(state)
      if (index > 0) {
        state.selectComponentId = state.componentList[index - 1].fe_id
      }
    },

    selectNextComponent: (state: ComponentsState) => {
      const index = getComponentIndexById(state)
      if (index >= 0 && index < state.componentList.length - 1) {
        state.selectComponentId = state.componentList[index + 1].fe_id
      }
    },

    changeComponentTitle: (
      state: ComponentsState,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload
      const componentInfo = getComponentInfo(state, fe_id)
      if (componentInfo) {
        componentInfo.title = title
      }
    },
    swapComponentList: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload
      const originComponentList = state.componentList
      state.componentList = arrayMove(originComponentList, oldIndex, newIndex)
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
  changeComponentTitle,
  swapComponentList,
} = componentsSlice.actions

export default componentsSlice.reducer
