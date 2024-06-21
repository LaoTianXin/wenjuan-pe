import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { SearchKeyEnum, DefaultSearchParams } from '../enum/SearchEnum'
import { getQuestionListService } from '../api'

export const useLoadQuestionListData = ({
  isDeleted,
  isStar,
}: Omit<Question.QuestionListProp, 'keywords'> = {}) => {
  const [searchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const request = useRequest(
    () => {
      const keywords = searchParams.get(SearchKeyEnum.KEYWORDS) || undefined
      const page = Number(searchParams.get(SearchKeyEnum.PAGE)) || DefaultSearchParams.PAGE
      const pageSize =
        Number(searchParams.get(SearchKeyEnum.PAGE_SIZE)) || DefaultSearchParams.PAGE_SIZE
      if (containerRef.current) {
        containerRef.current.scrollTop = 0
      }
      return getQuestionListService({ keywords, isDeleted, isStar, page, pageSize })
    },
    { refreshDeps: [searchParams] }
  )
  return {
    containerRef,
    ...request,
  }
}
