import React, { FC, useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
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
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionListService } from '../../api'

const { Title } = Typography
const { confirm } = Modal

const columns: TableColumnsType<Question.QuestionTable> = [
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
  const { data, loading, error, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list: questionList = [], total } = data || {}
  const [selectIds, setSelectIds] = useState<React.Key[]>([])

  const { run: restoreQuestion, loading: restoreLoading } = useRequest(
    // 同时恢复
    () => Promise.all(selectIds.map(id => updateQuestionService(String(id), { isDeleted: false }))),
    // 挨个删恢复
    // async () => {
    //   for await (const id of selectIds) {
    //     await updateQuestionService(String(id), { isDeleted: false })
    //   }
    // },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功')
        handleReset()
      },
    }
  )

  const { run: deleteQuestions, loading: deleteLoading } = useRequest(
    () => deleteQuestionListService(selectIds.map(id => String(id))),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        handleReset()
      },
    }
  )

  const handleReset = () => {
    setSelectIds([])
    refresh()
  }

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
        deleteQuestions()
      },
    })
  }

  const TableElement: JSX.Element = (
    <>
      <Space className="mb-6">
        <Button
          loading={restoreLoading}
          icon={<RestOutlined />}
          disabled={selectIds.length === 0 || deleteLoading}
          type="primary"
          onClick={() => restoreQuestion()}
        >
          恢复
        </Button>
        <Button
          loading={deleteLoading}
          icon={<DeleteOutlined />}
          onClick={() => handleDelete()}
          disabled={selectIds.length === 0 || restoreLoading}
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
        loading={loading}
        scroll={{ y: 420 }}
        dataSource={questionList}
        columns={columns}
        pagination={false}
        rowKey="_id"
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

      <div className="min-h-[500px] m-10">
        {!questionList || questionList.length === 0 ? (
          <Spin spinning={loading}>
            <Empty description={'暂无回收问卷'}></Empty>
          </Spin>
        ) : (
          TableElement
        )}
      </div>
      <ListPage total={total}></ListPage>
    </div>
  )
}

export default Trash
