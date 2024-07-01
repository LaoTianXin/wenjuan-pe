import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextAreaPropsType, defaultQuestionTextAreaProps } from './interface'

const { Paragraph } = Typography

const QuestionTextArea: FC<Partial<QuestionTextAreaPropsType>> = prop => {
  const { title, placeholder } = { ...defaultQuestionTextAreaProps, ...prop }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </div>
  )
}
export default QuestionTextArea
