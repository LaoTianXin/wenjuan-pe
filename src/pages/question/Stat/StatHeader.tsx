import React from 'react'
import { Button, Space, Typography, Input, Tooltip, QRCode, Popover, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { PathNameEnum } from '@/router/pathNameEnum'

const { Title } = Typography

const StatHeader: React.FC = () => {
  const nav = useNavigate()
  const { title, _id, isPublished } = useGetPageInfo()

  const getCenterElement = () => {
    if (!isPublished) return null
    const url = `http://localhost:3000/question/${_id}`
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(url)
        message.success('复制成功')
      } catch (error) {
        message.error('复制失败')
      }
    }
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }}></Input>
        <Tooltip title="复制链接">
          <Button onClick={() => handleCopy()} icon={<CopyOutlined />}></Button>
        </Tooltip>

        <Popover content={<QRCode value={url} bordered={false} />}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className="flex items-center justify-between h-full px-5">
      <div>
        <Space>
          <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined />}>
            返回
          </Button>
          <Title style={{ fontSize: '18px', marginBottom: '0' }}>{title}</Title>
        </Space>
      </div>

      <div className="flex items-center justify-center flex-1">{getCenterElement()}</div>

      <div className="">
        <Button type="primary" onClick={() => nav(`${PathNameEnum.QUESTION_EDIT}/${_id}`)}>
          编辑问卷
        </Button>
      </div>
    </div>
  )
}

export default StatHeader
