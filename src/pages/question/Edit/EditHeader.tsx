import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Typography, Input, message, Modal } from 'antd'
import { LeftOutlined, SaveOutlined, EditOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { useDebounceEffect, useRequest, useKeyPress } from 'ahooks'
import { changePageTitle } from '@/store/pageInfoReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import EditToolkit from './EditToolkit'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { updateQuestionService } from '@/api'

const { Title } = Typography
const { confirm } = Modal

const EditTitle: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [edit, setEdit] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  useEffect(() => {
    setEditTitle(title)
  }, [title])

  const handleEditTitle = () => {
    setEdit(true)
  }

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleChangeTitle = () => {
    const title = editTitle.trim()
    if (!title) return message.error('标题不能为空')
    setEdit(false)
    dispatch(changePageTitle({ title }))
  }

  if (edit)
    return (
      <Input
        onBlur={() => handleChangeTitle()}
        onPressEnter={() => handleChangeTitle()}
        value={editTitle}
        onChange={e => handleEditValueChange(e)}
      ></Input>
    )

  return (
    <>
      {title && (
        <Space align="baseline">
          <Title style={{ marginBottom: 0 }} level={4}>
            {title}
          </Title>
          <Button
            onClick={() => handleEditTitle()}
            type="text"
            icon={<EditOutlined></EditOutlined>}
          ></Button>
        </Space>
      )}
    </>
  )
}

const EditButtons: FC = () => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const data = {
    componentList: componentList,
    ...pageInfo,
  }

  useKeyPress(['ctrl.s', 'meta.s'], e => {
    e.preventDefault()
    if (!id) return
    updateQuestion()
  })

  useDebounceEffect(
    () => {
      if (!id) return
      if (updateLoading || publishLoading) return
      updateQuestion()
    },
    [pageInfo, componentList],
    { wait: 1000 }
  )

  const updateQuestionData = (props: QuestionServer.QuestionUpdateProp = {}) => {
    if (!id) return Promise.reject('id不存在')
    return updateQuestionService(id, Object.assign(data, props))
  }

  const { run: updateQuestion, loading: updateLoading } = useRequest(updateQuestionData, {
    manual: true,
    onSuccess() {
      message.success('保存成功')
    },
  })

  const { run: publishQuestion, loading: publishLoading } = useRequest(updateQuestionData, {
    manual: true,
    onSuccess() {
      message.success('发布成功')
    },
  })
  const handleSave = () => {
    updateQuestion()
  }

  const handlePublish = () => {
    confirm({
      title: '确定要发布吗',
      icon: <CloudUploadOutlined />,
      content: '发布后将不可更改',
      cancelText: '取消',
      okText: '发布',
      onOk() {
        publishQuestion({ isPublished: true })
      },
    })
  }
  return (
    <Space>
      <Button
        disabled={publishLoading}
        loading={updateLoading}
        onClick={() => handleSave()}
        icon={<SaveOutlined></SaveOutlined>}
      >
        保存
      </Button>
      <Button
        disabled={updateLoading}
        loading={publishLoading}
        onClick={() => handlePublish()}
        type="primary"
        icon={<CloudUploadOutlined />}
      >
        发布
      </Button>
    </Space>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className="flex items-center justify-between h-full px-5">
      <div>
        <Space>
          <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined></LeftOutlined>}>
            返回
          </Button>
          <EditTitle></EditTitle>
        </Space>
      </div>

      <div className="flex items-center justify-center flex-1">
        <EditToolkit></EditToolkit>
      </div>

      <div>
        <EditButtons></EditButtons>
      </div>
    </div>
  )
}

export default EditHeader
