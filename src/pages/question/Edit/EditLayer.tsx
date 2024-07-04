import React, { FC, useState } from 'react'
import { Button, Space, Input, message } from 'antd'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  setSelectComponentId,
  updateComponentHiddenState,
  toggleComponentLockedState,
  changeComponentTitle,
  swapComponentList,
} from '@/store/componentsReducer'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType } from '@/store/componentsReducer'
import SortableContainer from '@/components/Sortable/SortableContainer'
import SortableItem from '@/components/Sortable/SortableItem'

const LayerItem: FC<ComponentInfoType & { isSelect: boolean }> = ({
  fe_id,
  title,
  hidden,
  locked,
  isSelect,
}) => {
  const dispatch = useDispatch()
  // 选中组件

  const titleClassNames = classNames(['flex-1', 'cursor-pointer', { 'text-sky-400': isSelect }])
  const [showEditTitle, setShowEditTitle] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const handleChangeSelectId = () => {
    if (hidden) return message.info('不能选中被隐藏的组件')
    if (!isSelect) {
      dispatch(setSelectComponentId(fe_id))
      return setShowEditTitle(false)
    }
    setShowEditTitle(true)
  }

  const handleUpdateHiddenState = () => {
    dispatch(updateComponentHiddenState({ fe_id, hidden: !hidden }))
  }

  const handleToggleLockedState = () => {
    dispatch(toggleComponentLockedState({ fe_id }))
  }

  const handleBlur = () => {
    if (!editTitle) return
    if (!showEditTitle) return

    dispatch(changeComponentTitle({ fe_id, title: editTitle }))
    setShowEditTitle(false)
  }

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim()
    if (!showEditTitle) return message.error('组件标题不能为空')

    setEditTitle(text)
  }

  return (
    <div className="flex justify-between items-center px-1 py-[10px] text-sm text-gray-500 border-b border-gray-200">
      <div onClick={() => handleChangeSelectId()} className={titleClassNames}>
        {showEditTitle && isSelect ? (
          <Input
            onBlur={() => handleBlur()}
            onPressEnter={() => handleBlur()}
            onChange={e => handleUpdateTitle(e)}
            defaultValue={title}
          ></Input>
        ) : (
          title
        )}
      </div>
      <div className="transition-all duration-300 opacity-20 hover:opacity-100">
        <Space>
          <Button
            shape="circle"
            icon={hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => handleUpdateHiddenState()}
            type={hidden ? 'primary' : 'text'}
          ></Button>
          <Button
            shape="circle"
            icon={locked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleLockedState()}
            type={locked ? 'primary' : 'text'}
          ></Button>
        </Space>
      </div>
    </div>
  )
}

const EditLayer: FC = () => {
  const dispatch = useDispatch()
  const { selectComponentId, componentList } = useGetComponentInfo()

  const componentListById = componentList.map(item => ({ ...item, id: item.fe_id }))

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(swapComponentList({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListById} onDragEnd={handleDragEnd}>
      {componentList.map(props => (
        <SortableItem id={props.fe_id} key={props.fe_id}>
          <LayerItem {...props} isSelect={selectComponentId === props.fe_id}></LayerItem>
        </SortableItem>
      ))}
    </SortableContainer>
  )
}

export default EditLayer
