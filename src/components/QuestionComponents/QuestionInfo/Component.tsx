import React, { FC } from 'react'
import { Typography, Space } from 'antd'
import { QuestionInfoPropsType, defaultQuestionInfoProps } from './interface'
import { createSplitSpaceComponent } from '../utilComponent/createSplitSpaceComponent'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<Partial<QuestionInfoPropsType>> = prop => {
  const { text, title } = { ...defaultQuestionInfoProps, ...prop }
  const splitTextElement = createSplitSpaceComponent(text)
  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph style={{ marginBottom: '0' }}>{splitTextElement}</Paragraph>
    </Space>
  )
}

export default QuestionInfo
