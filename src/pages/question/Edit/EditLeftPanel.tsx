import React, { FC } from 'react'
import { Tabs, Space } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'

const items = [
  {
    label: (
      <Space>
        <AppstoreOutlined />
        组件库
      </Space>
    ),
    key: 'componentLib',
    children: <ComponentLib></ComponentLib>,
  },
  {
    label: (
      <Space>
        <BarsOutlined />
        图层
      </Space>
    ),
    key: 'layers',
    children: <div>图层</div>,
  },
]

const EditLeftPanel: FC = () => {
  const defaultActiveKey = 'componentLib'
  return <Tabs defaultActiveKey={defaultActiveKey} items={items}></Tabs>
}

export default EditLeftPanel
