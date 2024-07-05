import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
  CopyOutlined,
  SnippetsOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  deleteComponent,
  updateComponentHiddenState,
  toggleComponentLockedState,
  copyComponentInfo,
  pasteComponentInfo,
  swapComponentList,
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useComponentKeypress } from '@/hooks/useComponentKeypress'

const EditToolkit: FC = () => {
  const dispatch = useDispatch()
  const { selectComponentId, selectComponentInfo, copyComponent, showComponentList, future, past } =
    useGetComponentInfo()

  useComponentKeypress()

  const selectIndex = showComponentList.findIndex(item => item.fe_id === selectComponentId)

  const isFirst = selectIndex === 0

  const isLast = selectIndex === showComponentList.length - 1

  const handleDeleteComponent = () => {
    dispatch(deleteComponent())
  }

  const handleHiddenComponent = () => {
    dispatch(updateComponentHiddenState({ hidden: true }))
  }

  const handleToggleComponent = () => {
    dispatch(toggleComponentLockedState({ fe_id: selectComponentId }))
  }

  const handleCopyComponent = () => {
    dispatch(copyComponentInfo())
  }

  const handlePasteComponent = () => {
    dispatch(pasteComponentInfo())
  }

  const handleMoveUp = () => {
    if (isFirst) return
    dispatch(swapComponentList({ oldIndex: selectIndex, newIndex: selectIndex - 1 }))
  }

  const handleMoveDown = () => {
    if (isLast) return
    dispatch(swapComponentList({ oldIndex: selectIndex, newIndex: selectIndex + 1 }))
  }

  const handleUndo = () => {
    dispatch(ActionCreators.undo())
  }

  const handleRedo = () => {
    dispatch(ActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          onClick={() => handleDeleteComponent()}
          disabled={!selectComponentId}
          shape="circle"
          icon={<DeleteOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="隐藏">
        <Button
          onClick={() => handleHiddenComponent()}
          disabled={!selectComponentId}
          shape="circle"
          icon={<EyeInvisibleOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title={selectComponentInfo?.locked ? '解锁' : '锁定'}>
        <Button
          onClick={() => handleToggleComponent()}
          disabled={!selectComponentId}
          shape="circle"
          type={selectComponentInfo?.locked ? 'primary' : 'default'}
          icon={selectComponentInfo?.locked ? <UnlockOutlined /> : <LockOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="复制">
        <Button
          onClick={() => handleCopyComponent()}
          disabled={!selectComponentId}
          shape="circle"
          icon={<CopyOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="粘贴">
        <Button
          onClick={() => handlePasteComponent()}
          disabled={!copyComponent}
          shape="circle"
          icon={<SnippetsOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="上移">
        <Button
          onClick={() => handleMoveUp()}
          disabled={!selectComponentId || isFirst}
          shape="circle"
          icon={<ArrowUpOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="下移">
        <Button
          onClick={() => handleMoveDown()}
          disabled={!selectComponentId || isLast}
          shape="circle"
          icon={<ArrowDownOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="撤销">
        <Button
          disabled={past.length === 0}
          onClick={() => handleUndo()}
          shape="circle"
          icon={<UndoOutlined />}
        ></Button>
      </Tooltip>

      <Tooltip title="重做">
        <Button
          disabled={future.length === 0}
          onClick={() => handleRedo()}
          shape="circle"
          icon={<RedoOutlined />}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolkit
