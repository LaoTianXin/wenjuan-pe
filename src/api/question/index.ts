import request from '../request'

// 获取单个问卷信息
export const getQuestionById = (id: string) => {
  return request.get<Question.QuestionDataProp>(`/api/question/${id}`)
}

export const createQuestion = () => {
  return request.post<Pick<Question.QuestionDataProp, '_id'>>('/api/question')
}

export const getQuestionList = (params: Question.QuestionServerProp) => {
  return request.get<Pages<Question.QuestionDataProp>>('/api/question', { params })
}
