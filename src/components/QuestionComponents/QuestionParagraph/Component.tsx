import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, defaultQuestionParagraphProps } from './interface'
import { createSplitSpaceComponent } from '../utilComponent/createSplitSpaceComponent'

const { Paragraph } = Typography

const QuestionParagraph: FC<Partial<QuestionParagraphPropsType>> = prop => {
  const { text = '', isCenter = false } = { ...defaultQuestionParagraphProps, ...prop }
  const splitTextElement = createSplitSpaceComponent(text)
  return (
    <Paragraph className={isCenter ? 'text-center' : 'text-start'} style={{ marginBottom: 0 }}>
      {splitTextElement}
    </Paragraph>
  )
}

export default QuestionParagraph
