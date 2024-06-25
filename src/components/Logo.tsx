import React, { useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'

const { Title } = Typography
const Logo: React.FC = () => {
  const [pathname, setPathname] = useState(PathNameEnum.HOME)
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathname(PathNameEnum.MANAGE_LIST)
    } else {
      setPathname(PathNameEnum.HOME)
    }
  }, [username])
  return (
    <Link to={pathname}>
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
