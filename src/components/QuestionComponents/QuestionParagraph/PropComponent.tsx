import React from 'react'
import { Input, Select, Checkbox } from 'antd'
import { PropComponentConfigType, createPropComponent } from '../utilComponent/createPropComponent'

const propComponentList: PropComponentConfigType = () => [
  {
    formItemProps: {
      label: '段落内容',
      name: 'text',
    },
    render: <Input.TextArea />,
    required: true,
  },
  {
    formItemProps: {
      name: 'isCenter',
      valuePropName: 'checked',
    },
    render: <Checkbox>居中显示</Checkbox>,
  },
]

export default createPropComponent(propComponentList)
