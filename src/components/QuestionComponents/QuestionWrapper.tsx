import React, { FC, PropsWithChildren, MouseEvent } from 'react'
import classNames from 'classnames'

interface QuestionWrapperPropsType {
  onClick?: (e: MouseEvent) => void
  isSelect?: boolean
}

const QuestionWrapper: FC<PropsWithChildren<QuestionWrapperPropsType>> = ({
  children,
  onClick,
  isSelect = false,
}) => {
  const wrapperClass = classNames([
    'p-3',
    'm-3',
    'transition',
    'border-2',
    isSelect ? 'border-[#1fb202]' : 'border-white',
    'rounded',
    'cursor-pointer',
    { 'hover:border-gray-200': !isSelect },
  ])

  return (
    <div
      onClick={e => {
        onClick && onClick(e)
      }}
      className={wrapperClass}
    >
      <div className="pointer-events-none">{children}</div>
    </div>
  )
}

export default QuestionWrapper
