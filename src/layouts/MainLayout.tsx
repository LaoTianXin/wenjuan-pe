import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className="flex h-[65px] justify-between items-center leading-none bg-gray-600">
        <Logo></Logo>
        <UserInfo></UserInfo>
      </Header>
      <Content className="min-h-[calc(100vh-65px-65px)]">
        <Outlet />
      </Content>
      <Footer className="h-[65px] text-base text-center bg-gray-200 p-0 flex justify-center items-center">
        小昕问卷 &copy; 2024 - present . Created by LaoTianXin
      </Footer>
    </Layout>
  )
}

export default MainLayout
