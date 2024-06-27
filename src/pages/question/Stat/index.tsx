import React, { FC } from 'react'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  return <>123</>
}

export default Stat
