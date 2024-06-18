import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { SearchKeyEnum } from '../enum/SearchKeyEnum'
const ListSearch: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const searchValue = searchParams.get(SearchKeyEnum.KEYWORDS) || ''
    setSearchValue(searchValue)
  }, [searchParams])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    nav({
      pathname,
      search: value ? `${SearchKeyEnum.KEYWORDS}=${value}` : '',
    })
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
