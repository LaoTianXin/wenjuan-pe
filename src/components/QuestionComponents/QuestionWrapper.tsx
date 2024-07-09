import React, { FC, PropsWithChildren, MouseEvent } from 'react'
import classNames from 'classnames'

interface QuestionWrapperPropsType {
  onClick?: (e: MouseEvent) => void
  isSelect?: boolean
  locked?: boolean
  disabled?: boolean
}

const QuestionWrapper: FC<PropsWithChildren<QuestionWrapperPropsType>> = ({
  children,
  onClick,
  isSelect = false,
  locked = false,
  disabled = false,
}) => {
  const wrapperClass = classNames([
    'p-3',
    'm-3',
    'transition',
    'border-2',
    'rounded',
    'cursor-pointer',
    isSelect ? 'border-[#1fb202]' : 'border-white',
    { 'hover:border-gray-200': !isSelect },
    { 'opacity-50 cursor-not-allowed! select-none': locked },
    { 'opacity-50 cursor-not-allowed! select-none pointer-events-none': disabled },
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
