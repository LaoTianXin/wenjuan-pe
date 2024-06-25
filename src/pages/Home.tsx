import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { PathNameEnum } from '../router/pathNameEnum'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  useEffect(() => {
    console.log('loading')
  }, [])

  const nav = useNavigate()
  return (
    <div
      style={{ backgroundImage: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)' }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-65px-65px)]"
    >
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷 100 份， 发布问卷 90 份，收到答卷 980 份</Paragraph>
      <Button size="large" type="primary" onClick={() => nav(PathNameEnum.MANAGE_LIST)}>
        开始使用
      </Button>
    </div>
  )
}

export default Home
