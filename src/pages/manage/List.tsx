import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { useTitle, useInViewport, useRequest, useDebounceFn } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionList } from '../../api'
import { useSearchParams } from 'react-router-dom'
import { SearchKeyEnum, DefaultSearchParams } from '../../enum/SearchEnum'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷调查 - 问卷列表')

  const [started, setStarted] = useState(false)
  const [questionList, setQuestionList] = useState<Question.QuestionDataProp[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()

  const isHaveMore = total > questionList.length

  const keywords = searchParams.get(SearchKeyEnum.KEYWORDS) || undefined

  const { loading, run: load } = useRequest(() => getQuestionList({ page, pageSize, keywords }), {
    manual: true,
    onSuccess({ list, total }) {
      setQuestionList(questionList.concat(list))
      setTotal(total)
      setPage(page + 1)
    },
  })

  const moreRef = useRef<HTMLDivElement>(null)
  const [inViewport] = useInViewport(moreRef)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (isHaveMore || !started) {
        setStarted(true)
        load()
      }
    },
    {
      wait: 300,
    }
  )

  useEffect(() => {
    setStarted(false)
    setPage(DefaultSearchParams.PAGE)
    setPageSize(DefaultSearchParams.PAGE_SIZE)
    setTotal(0)
    setQuestionList([])
  }, [keywords])

  useEffect(() => {
    if (inViewport) {
      tryLoadMore()
    }
  }, [inViewport])

  const loadMore = useMemo(() => {
    if (!started || loading) return <Spin spinning={loading}></Spin>
    if (!total) return <Empty description={'暂无问卷'}></Empty>
    if (!isHaveMore) return <span className="text-sm text-gray-400">没有更多了</span>
    return <span className="text-sm text-gray-400">加载更多</span>
  }, [loading, total, isHaveMore])

  return (
    <div className="m-5">
      <header className="flex mb-3">
        <div className="flex-1">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="flex-1 text-right">
          <ListSearch></ListSearch>
        </div>
      </header>

      <div className="h-[calc(100vh-65px-65px-160px)] overflow-y-scroll">
        {questionList && questionList.map(q => <QuestionCard key={q._id} {...q} />)}

        <div ref={moreRef} className="mb-2 text-base text-center ">
          {loadMore}
        </div>
      </div>
    </div>
  )
}

export default List
