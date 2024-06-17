import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  TableColumnsType,
  Modal,
  message,
} from 'antd'
import { DeleteOutlined, RestOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { Title } = Typography
const { confirm } = Modal
const questionListRaw: List.QuestionProp[] = Array(5)
  .fill(null)
  .map((_, index) => {
    return {
      _id: Math.random().toString().slice(3, 8),
      title: '问卷' + (index + 1),
      isPublished: Math.random() > 0.5,
      isStar: Math.random() > 0.5,
      answerCount: Math.floor(Math.random() * 100),
      createAt: new Date().toLocaleString(),
    }
  })

const columns: TableColumnsType<List.QuestionProp> = [
  {
    title: '问卷标题',
    dataIndex: 'title',
    // key: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '填写数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
]

const Trash: FC = () => {
  useTitle('问卷调查 - 回收站')
  const [questionList, setQuestionList] = useState(questionListRaw)
  const [selectIds, setSelectIds] = useState<React.Key[]>([])

  const onRowSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectIds(selectedRowKeys)
  }

  const handleDelete = () => {
    confirm({
      cancelText: '取消',
      okText: '确定',
      title: '确定彻底删除选中的问卷吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('删除成功')
      },
    })
  }

  const TableElement: JSX.Element = (
    <>
      <Space className="mb-6">
        <Button icon={<RestOutlined />} disabled={selectIds.length === 0} type="primary">
          恢复
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete()}
          disabled={selectIds.length === 0}
          danger
        >
          彻底删除
        </Button>
      </Space>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: onRowSelectChange,
        }}
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey={q => q._id}
      ></Table>
    </>
  )

  return (
    <>
      <header className="flex">
        <div className="flex-1">
          <Title level={3}>星标问卷</Title>
        </div>
        <div className="flex-1 text-right">(搜索)</div>
      </header>
      <div className="m-10">
        {!questionList || questionList.length === 0 ? (
          <Empty description={'暂无回收问卷'}></Empty>
        ) : (
          TableElement
        )}
      </div>
    </>
  )
}

export default Trash
