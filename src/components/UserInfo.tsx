import React from 'react'
import { Space, Typography, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Link, useNavigate } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { userInfoService } from '../api'
import { removeToken, getToken } from '../utils/user-token'

const { Title } = Typography

const UserInfo: React.FC = () => {
  const nav = useNavigate()

  const { data } = useRequest(userInfoService)
  const { username, nickname } = data || {}
  const token = getToken()
  const loginOut = () => {
    removeToken()
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

  return <>{token && username ? UserInfo : Login}</>
}

export default UserInfo
