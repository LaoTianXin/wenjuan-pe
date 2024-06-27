import Component from './Component'
import { defaultQuestionTitleProps } from './interface'
import { ComponentConfigType } from '../index'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  defaultProps: defaultQuestionTitleProps,
}

export default componentConfig
