import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { createQuestionService } from '../api'
import { useRequest } from 'ahooks'

const manageList = [
  {
    title: '我的问卷',
    path: PathNameEnum.MANAGE_LIST,
    icon: <BarsOutlined />,
  },
  {
    title: '星标问卷',
    path: PathNameEnum.MANAGE_STAR,
    icon: <StarOutlined />,
  },
  {
    title: '回收站',
    path: PathNameEnum.MANAGE_TRASH,
    icon: <DeleteOutlined />,
  },
]

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleAddQuestion } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: data => {
      const { _id } = data || {}
      if (_id) {
        nav(`${PathNameEnum.QUESTION_EDIT}/${_id}`)
      }
    },
  })
  return (
    <div className="container flex p-8 pb-0">
      <div className="w-[120px]">
        <Space direction="vertical">
          <Button
            onClick={() => handleAddQuestion()}
            className="mb-5"
            type="primary"
            size="large"
            loading={loading}
            icon={<PlusOutlined />}
          >
            新增问卷
          </Button>
          {manageList.map(item => (
            <Button
              onClick={() => nav(item.path)}
              key={item.path}
              size="large"
              type={pathname.startsWith(item.path) ? 'default' : 'text'}
              icon={item.icon}
            >
              {item.title}
            </Button>
          ))}
        </Space>
      </div>
      <div className="flex-1 ml-[60px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
