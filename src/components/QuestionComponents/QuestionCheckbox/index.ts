import Component from './Component'
import { defaultQuestionCheckboxProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'
import ChartComponent from './ChartComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '复选',
  type: 'QuestionCheckbox',
  defaultProps: defaultQuestionCheckboxProps,
  group: 'QuestionFormGroup',
  Component,
  PropComponent,
  ChartComponent,
}

export default componentConfig
