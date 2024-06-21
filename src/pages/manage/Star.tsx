import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷调查 - 星标列表')
  const { data, loading, error, containerRef } = useLoadQuestionListData({ isStar: true })
  const { list: questionList = [], total } = data || {}
  return (
    <div className="m-5">
      <header className="flex mb-3">
        <div className="flex-1">
          <Title level={3}>星标问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch></ListSearch>
        </div>
      </header>
      <Spin spinning={loading} tip={'加载中...'} size={'large'}>
        <div ref={containerRef} className="h-[calc(100vh-65px-65px-180px)] overflow-y-scroll mb-5">
          {questionList &&
            questionList.length > 0 &&
            questionList.map(q => <QuestionCard key={q._id} {...q} />)}
        </div>
      </Spin>
      <ListPage total={total}></ListPage>
    </div>
  )
}

export default Star
