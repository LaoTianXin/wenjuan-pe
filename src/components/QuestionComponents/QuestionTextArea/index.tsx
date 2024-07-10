import Component from './Component'
import { defaultQuestionTextAreaProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '文本域',
  type: 'QuestionTextArea',
  Component,
  defaultProps: defaultQuestionTextAreaProps,
  group: 'QuestionFormGroup',
  PropComponent,
  meta: {
    tableWidth: 300,
  },
}

export default componentConfig
