import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷调查 - 问卷列表')
  const { data, loading, error } = useLoadQuestionListData()
  const { list: questionList = [], total = 0 } = data || {}
  return (
    <div className="m-5">
      <header className="flex mb-3">
        <div className="flex-1">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch></ListSearch>
        </div>
      </header>
      <Spin spinning={loading} tip={'加载中...'} size={'large'}>
        <div className="min-h-[500px]">
          {!loading && (!questionList || questionList.length === 0) ? (
            <Empty description={'暂无问卷'}></Empty>
          ) : (
            questionList.map(q => <QuestionCard key={q._id} {...q} />)
          )}
        </div>
      </Spin>
    </div>
  )
}

export default List
