import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputPropsType, defaultQuestionInputProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<Partial<QuestionInputPropsType>> = prop => {
  const { title, placeholder } = Object.assign(defaultQuestionInputProps, prop)
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}
export default QuestionInput
