import React, { FC, useState } from 'react'
import QuestionCard from '../components/QuestionCard/QuestionCard'

const questionListRaw: List.QuestionProp[] = Array(5)
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
  console.log(questionListRaw)

  const [questionList, setQuestionList] = useState(questionListRaw)
  return (
    <>
      <header className="flex">
        <div className="flex-1">
          <div className="text-2xl">我的问卷</div>
        </div>
        <div className="flex-1 text-right">(搜索)</div>
      </header>
      <div className="m-10">
        {questionList.map(q => (
          <QuestionCard key={q._id} {...q} />
        ))}
      </div>
      <footer className="text-center">footer</footer>
    </>
  )
}

export default List
