import React, { FC, useEffect, useState, useRef } from 'react'
import { Tabs, Space } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProps from './ComponentProps'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

const items = [
  {
    label: (
      <Space>
        <FileTextOutlined />
        属性
      </Space>
    ),
    key: 'props',
    children: <ComponentProps></ComponentProps>,
  },
  {
    label: (
      <Space>
        <SettingOutlined />
        页面设置
      </Space>
    ),
    key: 'setting',
    children: <div>页面设置</div>,
  },
]

const EditRightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState('props')
  const { selectComponentId } = useGetComponentInfo()

  useEffect(() => {
    if (!selectComponentId) {
      setActiveKey('setting')
    } else {
      setActiveKey('props')
    }
  }, [selectComponentId])

  return <Tabs onTabClick={key => setActiveKey(key)} activeKey={activeKey} items={items}></Tabs>
}

export default EditRightPanel
