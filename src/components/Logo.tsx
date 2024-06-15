import React from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'

const { Title } = Typography
const Logo: React.FC = () => {
  return (
    <Link to={PathNameEnum.HOME}>
      <Space>
        <Title className="!mb-0 !text-white" level={3}>
          <FormOutlined />
        </Title>
        <Title className="!mb-0 !text-white" level={4}>
          小昕问卷
        </Title>
      </Space>
    </Link>
  )
}

export default Logo
