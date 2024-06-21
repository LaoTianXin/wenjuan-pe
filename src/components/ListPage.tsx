import React, { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination, PaginationProps } from 'antd'
import { DefaultSearchParams, SearchKeyEnum } from '../enum/SearchEnum'

type ExcludeKeys = 'current' | 'pageSize' | 'onchange'

const ListPage: FC<Omit<PaginationProps, ExcludeKeys>> = prop => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(DefaultSearchParams.PAGE)
  const [pageSize, setPageSize] = useState(DefaultSearchParams.PAGE_SIZE)

  useEffect(() => {
    const page = Number(searchParams.get(SearchKeyEnum.PAGE)) || DefaultSearchParams.PAGE
    const pageSize =
      Number(searchParams.get(SearchKeyEnum.PAGE_SIZE)) || DefaultSearchParams.PAGE_SIZE
    setPage(page)
    setPageSize(pageSize)
  }, [searchParams])

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page)
    searchParams.set(SearchKeyEnum.PAGE, String(page))
    searchParams.set(SearchKeyEnum.PAGE_SIZE, String(pageSize))
    setSearchParams(searchParams)
  }

  return (
    <div className="text-center">
      <Pagination
        current={page}
        pageSize={pageSize}
        onChange={handlePageChange}
        {...prop}
      ></Pagination>
    </div>
  )
}

export default ListPage
