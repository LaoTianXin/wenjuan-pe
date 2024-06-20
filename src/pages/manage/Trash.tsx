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
  Spin,
} from 'antd'
import { DeleteOutlined, RestOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useLoadQuestionListData } from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const { confirm } = Modal

const columns: TableColumnsType<Question.QuestionDataProp> = [
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
  const { data, loading, error } = useLoadQuestionListData({ isDeleted: true })
  const { list: questionList = [], total } = data || {}
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
    <div className="m-5">
      <header className="flex mb-3">
        <div className="flex-1">
          <Title level={3}>回收站</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch></ListSearch>
        </div>
      </header>

      <Spin spinning={loading} tip={'加载中...'} size={'large'}>
        <div className="min-h-[500px] m-10">
          {!loading && (!questionList || questionList.length === 0) ? (
            <Empty description={'暂无回收问卷'}></Empty>
          ) : (
            TableElement
          )}
        </div>
      </Spin>
    </div>
  )
}

export default Trash
