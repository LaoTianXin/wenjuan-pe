import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionById } from '../api'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  return useRequest(() => getQuestionById(id))
}
