import Component from './Component'
import { defaultQuestionTitleProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  defaultProps: defaultQuestionTitleProps,
  group: 'QuestionTitleGroup',
  PropComponent,
}

export default componentConfig
