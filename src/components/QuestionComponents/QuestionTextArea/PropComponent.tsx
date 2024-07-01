import React from 'react'
import { Input } from 'antd'
import { PropComponentConfigType, createPropComponent } from '../utilComponent/createPropComponent'

const propComponentList: PropComponentConfigType = () => [
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
    render: <Input.TextArea />,
  },
]

export default createPropComponent(propComponentList)
