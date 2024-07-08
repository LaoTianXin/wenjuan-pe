import React, { FC } from 'react'
import { QuestionCheckboxPropsType, defaultQuestionCheckboxProps } from './interface'
import { Typography, Checkbox, Space } from 'antd'

const { Paragraph } = Typography

const QuestionCheckbox: FC<Partial<QuestionCheckboxPropsType>> = prop => {
  const { title, checkList = [], isVertical } = { ...defaultQuestionCheckboxProps, ...prop }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {checkList.map(option => (
          <Checkbox value={option.value} checked={option.checked} key={option.value}>
            {option.label}
          </Checkbox>
        ))}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
