import React from 'react'
import { Input } from 'antd'
import Component from './Component'
import { defaultQuestionInputProps } from './interface'
import { ComponentConfigType } from '../index'
import { CreatePropComponentPropsType, createPropComponent } from '../createPropComponent'

export * from './interface'

const propComponentList: CreatePropComponentPropsType[] = [
  {
    formItemProps: {
      label: '标题',
      name: 'title',
    },
    render: <Input />,
    required: true,
  },
  {
    formItemProps: {
      label: 'placeholder',
      name: 'placeholder',
    },
    render: <Input />,
  },
]

const componentConfig: ComponentConfigType = {
  title: '输入框',
  type: 'QuestionInput',
  Component,
  defaultProps: defaultQuestionInputProps,
  group: 'QuestionFormGroup',
  PropComponent: createPropComponent(propComponentList),
}

export default componentConfig
