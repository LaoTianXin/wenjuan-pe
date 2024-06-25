import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/user'
import { Space, Typography, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'

const { Title } = Typography

const UserInfo: React.FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { username, nickname } = useGetUserInfo()
  const loginOut = () => {
    dispatch(logoutReducer())
    message.success('退出成功')
    nav(PathNameEnum.LOGIN)
  }

  const UserInfo = (
    <Space>
      <Title className="!mb-0 !text-gray-300" level={5}>
        <UserOutlined />
      </Title>
      <Title className="!mb-0 !text-gray-300" level={5}>
        {nickname || username}
      </Title>
      <Button onClick={() => loginOut()} type="link">
        退出
      </Button>
    </Space>
  )

  const Login = (
    <Link to={PathNameEnum.LOGIN}>
      <Space>
        <Title className="!mb-0 !text-gray-300" level={5}>
          <UserOutlined />
        </Title>
        <Title className="!mb-0 !text-gray-300" level={5}>
          登录
        </Title>
      </Space>
    </Link>
  )

  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
