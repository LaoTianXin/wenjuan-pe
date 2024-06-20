import React, { FC } from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return <>{loading ? <div>loading...</div> : JSON.stringify(data)}</>
}

export default Stat
