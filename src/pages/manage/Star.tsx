import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'
const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷调查 - 星标列表')
  const { data, loading, error } = useLoadQuestionListData({ isStar: true })
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
        <div className="min-h-[500px]">
          {!loading && (!questionList || questionList.length === 0) ? (
            <Empty description={'暂无星标问卷'}></Empty>
          ) : (
            questionList.map(q => <QuestionCard key={q._id} {...q} />)
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Star
