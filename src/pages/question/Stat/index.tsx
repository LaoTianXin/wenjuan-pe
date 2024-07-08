import React, { FC } from 'react'
import { Button, Result, Spin } from 'antd'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)

  const loadingElement = <Spin size="large" className="flex-1"></Spin>
  const notPublishedElement = (
    <Result
      className="flex-1"
      status="warning"
      title="未发布该问卷"
      extra={
        <Button onClick={() => nav(-1)} type="primary">
          返回
        </Button>
      }
    />
  )

  const showElement = (
    <>
      <div className="shadow-2xl rounded-2xl w-[500px] h-full bg-white"></div>
      <div className="flex-1 w-full h-full bg-white shadow-2xl rounded-2xl"></div>
      <div className="shadow-2xl rounded-2xl w-[500px] h-full bg-white"></div>
    </>
  )

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="h-[50px] bg-white w-full">header</div>
      <div className="flex items-center justify-between flex-auto w-full gap-5 p-5">
        {loading ? loadingElement : isPublished ? showElement : notPublishedElement}
      </div>
    </div>
  )
}

export default Stat
