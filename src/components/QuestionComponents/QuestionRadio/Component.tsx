import React, { FC } from 'react'
import { QuestionRadioPropsType, defaultQuestionRadioProps } from './interface'
import { Typography, Radio, Space } from 'antd'

const { Paragraph } = Typography

const QuestionRadio: FC<Partial<QuestionRadioPropsType>> = prop => {
  const { title, value, options = [], isVertical } = { ...defaultQuestionRadioProps, ...prop }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => (
            <Radio value={option.value} key={option.value}>
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
