import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PathNameEnum } from '../router/pathNameEnum'
const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="您访问的网址不存在"
      extra={
        <Button onClick={() => nav(PathNameEnum.HOME)} type="primary">
          回到首页
        </Button>
      }
    />
  )
}

export default NotFound
