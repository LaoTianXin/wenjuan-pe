import React, { FC } from 'react'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return <>{loading ? <div>loading...</div> : JSON.stringify(data)}</>
}

export default Edit
