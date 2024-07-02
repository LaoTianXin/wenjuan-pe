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

  const safeHandleKeyPress = (eventHandler: (event: KeyboardEvent, key: any) => void) => {
    if (getActiveFocusElementIsBody()) {
      return eventHandler
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return (event: KeyboardEvent, key: any) => {}
    }
  }

  useKeyPress(
    ['delete', 'backspace', 'd', 'D'],
    safeHandleKeyPress(() => {
      if (!selectComponentId) return message.error('当前没有选中组件')
      dispatch(deleteComponent())
    })
  )

  useKeyPress(
    ['h', 'H'],
    safeHandleKeyPress(() => {
      if (!selectComponentId) return message.error('当前没有选中组件')
      dispatch(updateComponentHiddenState({ hidden: true }))
    })
  )

  useKeyPress(
    ['l', 'L'],
    safeHandleKeyPress(() => {
      if (!selectComponentId) return message.error('当前没有选中组件')
      dispatch(toggleComponentLockedState({ fe_id: selectComponentId }))
    })
  )

  useKeyPress(
    ['ctrl.c', 'meta.c'],
    safeHandleKeyPress(() => {
      if (!selectComponentId) return message.error('当前没有选中组件')
      dispatch(copyComponentInfo())
    })
  )

  useKeyPress(
    ['ctrl.v', 'meta.v'],
    safeHandleKeyPress(() => {
      if (!copyComponent) return message.error('当前没有可粘贴组件')
      dispatch(pasteComponentInfo())
    })
  )

  useKeyPress(
    'uparrow',
    safeHandleKeyPress(() => {
      dispatch(selectPrevComponent())
    })
  )

  useKeyPress(
    'downarrow',
    safeHandleKeyPress(() => {
      dispatch(selectNextComponent())
    })
  )
}
