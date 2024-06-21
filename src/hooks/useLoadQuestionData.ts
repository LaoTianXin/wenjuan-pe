import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionByIdService } from '../api'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  return useRequest(() => getQuestionByIdService(id))
}
