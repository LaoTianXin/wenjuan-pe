import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
  CopyOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  deleteComponent,
  updateComponentHiddenState,
  toggleComponentLockedState,
  copyComponentInfo,
  pasteComponentInfo,
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useComponentKeypress } from '@/hooks/useComponentKeypress'

const EditToolkit: FC = () => {
  const dispatch = useDispatch()
  const { selectComponentId, selectComponentInfo, copyComponent } = useGetComponentInfo()

  useComponentKeypress()

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
    </Space>
  )
}

export default EditToolkit
