import { message } from 'antd'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  deleteComponent,
  updateComponentHiddenState,
  toggleComponentLockedState,
  copyComponentInfo,
  pasteComponentInfo,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

export const useComponentKeypress = () => {
  const dispatch = useDispatch()
  const { selectComponentId, copyComponent, future, past } = useGetComponentInfo()

  const getActiveFocusElementIsBody = () => {
    if (!document.activeElement) return false
    const isActive = document.activeElement.matches('div[role="button"]')
    return document.activeElement === document.body || isActive
  }

  useKeyPress(['delete', 'backspace', 'd', 'D'], () => {
    if (!getActiveFocusElementIsBody()) return
    if (!selectComponentId) return message.error('当前没有选中组件')
    dispatch(deleteComponent())
  })

  useKeyPress(['h', 'H'], () => {
    if (!getActiveFocusElementIsBody()) return
    if (!selectComponentId) return message.error('当前没有选中组件')
    dispatch(updateComponentHiddenState({ hidden: true }))
  })

  useKeyPress(['l', 'L'], () => {
    if (!getActiveFocusElementIsBody()) return
    if (!selectComponentId) return message.error('当前没有选中组件')
    dispatch(toggleComponentLockedState({ fe_id: selectComponentId }))
  })

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!getActiveFocusElementIsBody()) return

    if (!selectComponentId) return message.error('当前没有选中组件')
    dispatch(copyComponentInfo())
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!getActiveFocusElementIsBody()) return

    if (!copyComponent) return message.error('当前没有可粘贴组件')
    dispatch(pasteComponentInfo())
  })

  useKeyPress('uparrow', () => {
    if (!getActiveFocusElementIsBody()) return
    if (!selectComponentId) return message.error('当前没有选中组件')

    dispatch(selectPrevComponent())
  })

  useKeyPress('downarrow', () => {
    if (!getActiveFocusElementIsBody()) return
    if (!selectComponentId) return message.error('当前没有选中组件')

    dispatch(selectNextComponent())
  })

  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!getActiveFocusElementIsBody()) return
      if (!past.length) return message.error('没有历史记录')

      dispatch(ActionCreators.undo())
    },
    { exactMatch: true }
  )

  useKeyPress(
    ['ctrl.y', 'meta.y', 'ctrl.shift.z', 'meta.shift.z'],

    () => {
      if (!getActiveFocusElementIsBody()) return
      if (!future.length) return message.error('没有新增记录')

      dispatch(ActionCreators.redo())
    },
    { exactMatch: true }
  )
}
