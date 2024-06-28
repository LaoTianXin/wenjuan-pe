import React, { FC } from 'react'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className="flex items-center justify-between h-full px-5">
      <div>
        <Space>
          <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined></LeftOutlined>}>
            返回
          </Button>

          <Title style={{ marginBottom: 0 }} level={4}>
            问卷标题
          </Title>
        </Space>
      </div>

      <div className="flex items-center justify-center flex-1">中间部分</div>

      <div>
        <Space>
          <Button icon={<SaveOutlined></SaveOutlined>}>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
