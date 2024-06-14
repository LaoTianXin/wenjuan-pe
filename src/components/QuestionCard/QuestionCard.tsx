import React, { FC } from 'react'

const QuestionCard: FC<QuestionCard.QuestionProp> = ({
  title,
  isPublished,
  answerCount,
  createAt,
}) => {
  return (
    <div className="px-3 mb-5 transition-all duration-300 bg-white rounded-lg hover:shadow-md">
      <div className="flex items-center justify-between py-3 border-b border-gray-300">
        <div className="text-blue-400">{title}</div>
        <div className="flex items-center text-sm">
          <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-200">
            {isPublished ? <span className="text-green-500">已发布</span> : '未发布'}
          </button>
          <div className="mx-3">答卷：{answerCount}</div>
          <div>{createAt}</div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 text-lg cursor-pointer">
        <div className="flex items-center text-gray-300">
          <div className="mr-2 hover:text-black">编辑问卷</div>
          <div className="hover:text-black">数据统计</div>
        </div>

        <div className="flex items-center text-gray-300">
          <div className="mr-2 hover:text-black">标星</div>
          <div className="mr-2 hover:text-black">复制</div>
          <div className="hover:text-black">删除</div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
