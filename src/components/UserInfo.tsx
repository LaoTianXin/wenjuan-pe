import React from 'react'
import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
const { Title } = Typography

const UserInfo: React.FC = () => {
  return (
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
}

export default UserInfo
