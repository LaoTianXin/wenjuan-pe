import React, { FC, useState } from 'react'
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
import { useRequest } from 'ahooks'
import { PathNameEnum } from '../router/pathNameEnum'
import { updateQuestionService, duplicateQuestionService } from '../api'

const { confirm } = Modal
const QuestionCard: FC<QuestionComponent.QuestionTable> = ({
  title,
  isPublished,
  answerCount,
  createAt,
  isStar,
  isDeleted,
  _id,
}) => {
  const nav = useNavigate()

  const [isStarState, setIsStarState] = useState(isStar)
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)

  //  改变星标状态
  const { run: updateStarState, loading: starLoading } = useRequest(
    () => updateQuestionService(_id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('修改成功')
      },
    }
  )

  // 复制问卷
  const { run: duplicateQuestionItem, loading: duplicateLoading } = useRequest(
    () => duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess({ _id }) {
        nav(PathNameEnum.QUESTION_EDIT + `/${_id}`)
      },
    }
  )

  // 删除问卷
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    () => updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true)
        message.success('删除成功')
      },
    }
  )

  const handleDelete = () => {
    confirm({
      title: '确定要删除问卷嘛？',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        deleteQuestion()
      },
    })
  }

  if (isDeletedState) return null

  return (
    <div className="px-3 mb-5 transition-all duration-300 bg-white rounded-lg last:mb-0 hover:shadow-md">
      <div className="flex items-center justify-between pt-3 ">
        <Link
          to={
            isPublished
              ? `${PathNameEnum.QUESTION_STAT}/${_id}`
              : `${PathNameEnum.QUESTION_EDIT}/${_id}`
          }
        >
          <Space>
            {isStarState && <StarFilled className="text-red-500"></StarFilled>}
            {title}
          </Space>
        </Link>
        <div className="flex items-center text-base">
          {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
          <div className="mx-3">答卷：{answerCount}</div>
          <div>{createAt}</div>
        </div>
      </div>
      <Divider className="my-3"></Divider>
      <div className="flex items-center justify-between p-3 pt-0 text-lg cursor-pointer">
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
            loading={starLoading}
            onClick={() => updateStarState()}
            icon={
              isStarState ? (
                <StarFilled className="text-red-500"></StarFilled>
              ) : (
                <StarOutlined className="text-red-500"></StarOutlined>
              )
            }
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            cancelText="取消"
            okText="确定"
            title="确认复制"
            onConfirm={() => duplicateQuestionItem()}
          >
            <Button
              loading={duplicateLoading}
              type="text"
              size="small"
              icon={<CopyOutlined></CopyOutlined>}
            >
              复制
            </Button>
          </Popconfirm>

          <Button
            loading={deleteLoading}
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
