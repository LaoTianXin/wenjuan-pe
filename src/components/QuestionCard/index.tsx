import React, { FC } from 'react'
import { Button, Space, Tag, Divider, Popconfirm, message, Modal } from 'antd'
import {
  EditFilled,
  DatabaseFilled,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { PathNameEnum } from '../../router/pathNameEnum'

const { confirm } = Modal
const QuestionCard: FC<QuestionCard.QuestionProp> = ({
  title,
  isPublished,
  answerCount,
  createAt,
  isStar,
  _id,
}) => {
  const nav = useNavigate()

  const handleCopy = () => {
    message.success('复制成功')
  }

  const handleDelete = () => {
    confirm({
      title: '确定要删除问卷嘛？',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        message.success('删除成功')
      },
    })
  }
  return (
    <div className="px-3 mb-5 transition-all duration-300 bg-white rounded-lg hover:shadow-md">
      <div className="flex items-center justify-between py-3 ">
        <Link
          to={
            isPublished
              ? `${PathNameEnum.QUESTION_STAT}/${_id}`
              : `${PathNameEnum.QUESTION_EDIT}/${_id}`
          }
        >
          <Space>
            {isStar && <StarFilled className="text-red-500"></StarFilled>}
            {title}
          </Space>
        </Link>
        <div className="flex items-center text-base">
          {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
          <div className="mx-3">答卷：{answerCount}</div>
          <div>{createAt}</div>
        </div>
      </div>
      <Divider className="my-2"></Divider>
      <div className="flex items-center justify-between p-3 text-lg cursor-pointer">
        <div className="flex items-center text-gray-300">
          <Space>
            <Button
              onClick={() => nav(`${PathNameEnum.QUESTION_EDIT}/${_id}`)}
              type="text"
              size="small"
              icon={<EditFilled></EditFilled>}
            >
              编辑问卷
            </Button>

            <Button
              onClick={() => nav(`${PathNameEnum.QUESTION_STAT}/${_id}`)}
              type="text"
              size="small"
              icon={<DatabaseFilled></DatabaseFilled>}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>

        <Space>
          <Button
            type="text"
            size="small"
            icon={
              isStar ? (
                <StarFilled className="text-red-500"></StarFilled>
              ) : (
                <StarOutlined className="text-red-500"></StarOutlined>
              )
            }
          >
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Popconfirm cancelText="取消" okText="确定" title="确认复制" onConfirm={handleCopy}>
            <Button type="text" size="small" icon={<CopyOutlined></CopyOutlined>}>
              复制
            </Button>
          </Popconfirm>

          <Button
            onClick={() => handleDelete()}
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined></DeleteOutlined>}
          >
            删除
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default QuestionCard
