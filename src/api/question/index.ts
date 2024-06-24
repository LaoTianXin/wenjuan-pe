import request from '../request'

// 创建问卷
export const createQuestionService = () => {
  return request.post<QuestionServer.QuestionCreateData>('/api/question')
}

// 获取问卷列表
export const getQuestionListService = (params: QuestionServer.QuestionListProp) => {
  return request.get<QuestionServer.QuestionListData>('/api/question', { params })
}

// 获取单个问卷信息
export const getQuestionByIdService = (id: QuestionServer.id) => {
  return request.get<QuestionServer.QuestionDetailData>(`/api/question/${id}`)
}

// 更新问卷
export const updateQuestionService = (
  id: QuestionServer.id,
  data: QuestionServer.QuestionUpdateProp
) => {
  return request.patch<QuestionServer.QuestionUpdateData>(`/api/question/${id}`, data)
}

// 删除问卷
export const deleteQuestionListService = (data: QuestionServer.QuestionDeleteProp) => {
  return request.delete<QuestionServer.QuestionDeleteData>('/api/question', { data })
}

// 复制问卷
export const duplicateQuestionService = (id: QuestionServer.id) => {
  return request.post<QuestionServer.QuestionDuplicateData>(`/api/question/duplicate/${id}`)
}
