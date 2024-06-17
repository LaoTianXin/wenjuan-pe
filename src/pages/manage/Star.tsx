import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'

const { Title } = Typography
const questionListRaw: List.QuestionProp[] = Array(3)
  .fill(null)
  .map((_, index) => {
    return {
      _id: Math.random().toString().slice(3, 8),
      title: '问卷' + (index + 1),
      isPublished: Math.random() > 0.5,
      isStar: true,
      answerCount: Math.floor(Math.random() * 100),
      createAt: new Date().toLocaleString(),
    }
  })

const Star: FC = () => {
  useTitle('问卷调查 - 星标列表')
  const [questionList, setQuestionList] = useState(questionListRaw)
  return (
    <>
      <header className="flex">
        <div className="flex-1">
          <Title level={3}>星标问卷</Title>
        </div>
        <div className="flex-1 text-right">(搜索)</div>
      </header>
      <div className="m-10">
        {!questionList || questionList.length === 0 ? (
          <Empty description={'暂无问卷'}></Empty>
        ) : (
          questionList.map(q => <QuestionCard key={q._id} {...q} />)
        )}
      </div>
    </>
  )
}

export default Star
