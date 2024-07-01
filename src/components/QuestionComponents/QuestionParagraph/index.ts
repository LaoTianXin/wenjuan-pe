import Component from './Component'
import { defaultQuestionParagraphProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '段落',
  type: 'QuestionParagraph',
  defaultProps: defaultQuestionParagraphProps,
  group: 'QuestionTitleGroup',
  Component,
  PropComponent,
}

export default componentConfig
