import React, { FC, PropsWithChildren } from 'react'

const QuestionWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-3 m-3 transition border-2 border-white rounded cursor-pointer hover:border-sky-200">
      <div className="pointer-events-none">{children}</div>
    </div>
  )
}

export default QuestionWrapper
