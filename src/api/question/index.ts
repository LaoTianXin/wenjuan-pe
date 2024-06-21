import request from '../request'

export const createQuestionService = () => {
  return request.post<Question.QuestionCreateData>('/api/question')
}

export const getQuestionListService = (params: Question.QuestionListProp) => {
  return request.get<Question.QuestionListData>('/api/question', { params })
}

// 获取单个问卷信息
export const getQuestionByIdService = (id: Question.id) => {
  return request.get<Question.QuestionDetailData>(`/api/question/${id}`)
}

export const updateQuestionService = (id: Question.id, data: Question.QuestionUpdateProp) => {
  return request.patch<Question.QuestionUpdateData>(`/api/question/${id}`, data)
}

export const deleteQuestionListService = (data: Question.QuestionDeleteProp) => {
  return request.delete<Question.QuestionDeleteData>('/api/question', { data })
}

export const duplicateQuestionService = (id: Question.id) => {
  return request.post<Question.QuestionDuplicateData>(`/api/question/duplicate/${id}`)
}
