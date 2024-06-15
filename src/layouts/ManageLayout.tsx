import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
  return (
    <div className="flex px-[24px] my-0 mx-auto w-[1200px]">
      <div className="w-[120px]">
        <p>ManageLayout</p>
      </div>

      <div className="flex-1 ml-[60px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
