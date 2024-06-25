import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import { useLoadUserData } from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waiting } = useLoadUserData()
  useNavPage(waiting)
  return (
    <Layout>
      <Header className="flex h-[65px] justify-between items-center leading-none bg-gray-600">
        <Logo></Logo>
        <UserInfo></UserInfo>
      </Header>
      <Content className="h-[calc(100vh-65px-65px)]">
        {waiting ? (
          <div className="flex items-center justify-center h-full bg-sky-100">
            <Spin size="large"></Spin>
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className="h-[65px] text-base text-center bg-gray-200 p-0 flex justify-center items-center">
        小昕问卷 &copy; 2024 - present . Created by LaoTianXin
      </Footer>
    </Layout>
  )
}

export default MainLayout
