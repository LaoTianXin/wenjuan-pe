import React from 'react'
import { Input, Select, Checkbox } from 'antd'
import Component from './Component'
import { defaultQuestionTitleProps } from './interface'
import { ComponentConfigType } from '../index'
import { CreatePropComponentPropsType, createPropComponent } from '../createPropComponent'

export * from './interface'

const propComponentList: CreatePropComponentPropsType[] = [
  {
    formItemProps: {
      label: '标题内容',
      name: 'title',
    },
    render: <Input />,
    required: true,
  },
  {
    formItemProps: {
      label: '层级',
      name: 'level',
    },
    render: (
      <Select
        options={[
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
        ]}
      ></Select>
    ),
  },
  {
    formItemProps: {
      name: 'isCenter',
      valuePropName: 'checked',
    },
    render: <Checkbox>居中显示</Checkbox>,
  },
]

const componentConfig: ComponentConfigType = {
  title: '标题',
  type: 'QuestionTitle',
  Component,
  defaultProps: defaultQuestionTitleProps,
  group: 'QuestionTitleGroup',
  PropComponent: createPropComponent(propComponentList),
}

export default componentConfig
