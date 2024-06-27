import Component from './Component'
import { defaultQuestionInputProps } from './interface'
import { ComponentConfigType } from '../index'

export * from './interface'

const componentConfig: ComponentConfigType = {
  title: '输入框',
  type: 'QuestionInput',
  Component,
  defaultProps: defaultQuestionInputProps,
}

export default componentConfig
