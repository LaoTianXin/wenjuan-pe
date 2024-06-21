import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { SearchKeyEnum } from '../enum/SearchEnum'
const ListSearch: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const searchValue = searchParams.get(SearchKeyEnum.KEYWORDS) || ''
    setSearchValue(searchValue)
  }, [searchParams])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    const searchParams = new URLSearchParams()
    searchParams.set(SearchKeyEnum.KEYWORDS, value)
    setSearchParams(searchParams)
  }

  return (
    <Input.Search
      style={{ width: '200px' }}
      value={searchValue}
      allowClear
      onChange={handleSearchChange}
      onSearch={handleSearch}
    />
  )
}

export default ListSearch
