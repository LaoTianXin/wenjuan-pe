import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const questionListRaw: List.QuestionProp[] = Array(4)
  .fill(null)
  .map((_, index) => {
    return {
      _id: Math.random().toString().slice(3, 8),
      title: '问卷' + (index + 1),
      isPublished: Math.random() > 0.5,
      isStar: Math.random() > 0.5,
      answerCount: Math.floor(Math.random() * 100),
      createAt: new Date().toLocaleString(),
    }
  })

const List: FC = () => {
  useTitle('问卷调查 - 问卷列表')
  const [questionList, setQuestionList] = useState(questionListRaw)
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
      <div>
        {!questionList || questionList.length === 0 ? (
          <Empty description={'暂无问卷'}></Empty>
        ) : (
          questionList.map(q => <QuestionCard key={q._id} {...q} />)
        )}
      </div>
    </div>
  )
}

export default List
