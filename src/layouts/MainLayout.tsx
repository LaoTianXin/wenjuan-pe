import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <header>header</header>
      <div>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  )
}

export default MainLayout
