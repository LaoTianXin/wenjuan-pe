import React, { FC } from 'react'
import { QuestionTitlePropsType, defaultQuestionTitleProps } from './interface'
import { Typography } from 'antd'

const { Title } = Typography

const QuestionTitle: FC<Partial<QuestionTitlePropsType>> = prop => {
  const { title, level, isCenter } = { ...defaultQuestionTitleProps, ...prop }

  const getTitleFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '26px'

    return '16px'
  }

  return (
    <Title
      className={isCenter ? 'text-center' : 'text-start'}
      style={{ marginBottom: 0, fontSize: getTitleFontSize(level) }}
      level={level}
    >
      {title}
    </Title>
  )
}

export default QuestionTitle
