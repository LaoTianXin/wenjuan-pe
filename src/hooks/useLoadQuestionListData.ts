import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { SearchKeyEnum } from '../enum/SearchKeyEnum'
import { getQuestionList } from '../api'

export const useLoadQuestionListData = ({
  isDeleted,
  isStar,
}: Omit<Question.QuestionServerProp, 'keywords'> = {}) => {
  const [searchParams] = useSearchParams()

  return useRequest(
    () => {
      const keywords = searchParams.get(SearchKeyEnum.KEYWORDS) || undefined
      return getQuestionList({ keywords, isDeleted, isStar })
    },
    { refreshDeps: [searchParams] }
  )
}
