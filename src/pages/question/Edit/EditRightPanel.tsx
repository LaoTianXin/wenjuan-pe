import React, { FC, useEffect, useState } from 'react'
import { Tabs, Space } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProps from './ComponentProps'
import EditSetting from './EditSetting'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

enum EditRightPanelKey {
  Props = 'props',
  Setting = 'setting',
}

const items = [
  {
    label: (
      <Space>
        <FileTextOutlined />
        属性
      </Space>
    ),
    key: EditRightPanelKey.Props,
    children: <ComponentProps></ComponentProps>,
  },
  {
    label: (
      <Space>
        <SettingOutlined />
        页面设置
      </Space>
    ),
    key: EditRightPanelKey.Setting,
    children: <EditSetting></EditSetting>,
  },
]

const EditRightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(EditRightPanelKey.Props)
  const { selectComponentId } = useGetComponentInfo()

  useEffect(() => {
    if (!selectComponentId) {
      setActiveKey(EditRightPanelKey.Setting)
    } else {
      setActiveKey(EditRightPanelKey.Props)
    }
  }, [selectComponentId])

  return (
    <Tabs
      onTabClick={key => setActiveKey(key as EditRightPanelKey)}
      activeKey={activeKey}
      items={items}
    ></Tabs>
  )
}

export default EditRightPanel
