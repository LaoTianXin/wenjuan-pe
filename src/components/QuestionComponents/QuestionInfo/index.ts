import Component from './Component'
import { defaultQuestionInfoProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '问卷信息',
  type: 'QuestionInfo',
  defaultProps: defaultQuestionInfoProps,
  group: 'QuestionTitleGroup',
  Component,
  PropComponent,
}

export default componentConfig
