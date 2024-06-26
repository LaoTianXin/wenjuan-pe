import React, { FC } from 'react'
import QuestionWrapper from '@/components/QuestionComponents/QuestionWrapper'
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle'
import QuestionInput from '@/components/QuestionComponents/QuestionInput'

const EditCanvas: FC = () => {
  return (
    <div className="min-h-full overflow-hidden">
      <QuestionWrapper>
        <QuestionTitle isCenter></QuestionTitle>
      </QuestionWrapper>
      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>
      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>
      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>
      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>

      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>
      <QuestionWrapper>
        <QuestionInput></QuestionInput>
      </QuestionWrapper>
    </div>
  )
}

export default EditCanvas
