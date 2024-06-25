import React, { FC } from 'react'
import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import { useLoadUserData } from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waiting } = useLoadUserData()
  useNavPage(waiting)
  return (
    <>
      <div>QuestionLayout</div>
      <div>{waiting ? <Spin size="large"></Spin> : <Outlet />}</div>
    </>
  )
}

export default QuestionLayout
