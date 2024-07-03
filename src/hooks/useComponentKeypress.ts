import { message } from 'antd'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
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
  const { selectComponentId, copyComponent } = useGetComponentInfo()

  const getActiveFocusElementIsBody = () => {
    return document.activeElement === document.body
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
}
