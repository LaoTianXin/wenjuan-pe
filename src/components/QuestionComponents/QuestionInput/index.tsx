import Component from './Component'
import { defaultQuestionInputProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '输入框',
  type: 'QuestionInput',
  Component,
  defaultProps: defaultQuestionInputProps,
  group: 'QuestionFormGroup',
  PropComponent,
}

export default componentConfig
