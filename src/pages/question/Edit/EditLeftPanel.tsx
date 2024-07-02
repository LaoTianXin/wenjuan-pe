import React, { FC } from 'react'
import { Tabs, Space } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import EditLayer from './EditLayer'

enum EditLeftPanelKey {
  ComponentLib = 'componentLib',
  Layers = 'layers',
}

const items = [
  {
    label: (
      <Space>
        <AppstoreOutlined />
        组件库
      </Space>
    ),
    key: EditLeftPanelKey.ComponentLib,
    children: <ComponentLib></ComponentLib>,
  },
  {
    label: (
      <Space>
        <BarsOutlined />
        图层
      </Space>
    ),
    key: EditLeftPanelKey.Layers,
    children: <EditLayer></EditLayer>,
  },
]

const EditLeftPanel: FC = () => {
  const defaultActiveKey = EditLeftPanelKey.ComponentLib
  return <Tabs defaultActiveKey={defaultActiveKey} items={items}></Tabs>
}

export default EditLeftPanel
