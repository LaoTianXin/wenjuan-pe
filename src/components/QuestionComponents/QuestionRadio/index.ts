import Component from './Component'
import { defaultQuestionRadioProps } from './interface'
import { ComponentConfigType } from '../index'
import PropComponent from './PropComponent'
import ChartComponent from './ChartComponent'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '单选',
  type: 'QuestionRadio',
  defaultProps: defaultQuestionRadioProps,
  group: 'QuestionFormGroup',
  Component,
  PropComponent,
  ChartComponent,
}

export default componentConfig
