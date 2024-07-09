import React, { FC, MouseEvent } from 'react'
import { Typography } from 'antd'
import { getComponentConfigByType } from '@/components/QuestionComponents'
import { ComponentInfoType } from '@/store/componentsReducer'
import QuestionWrapper from '@/components/QuestionComponents/QuestionWrapper'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

interface StatMainPanelPropsType {
  selectId: string
  updateSelectId: (id: string) => void
}

const getComponent = ({ type, props = {} }: ComponentInfoType) => {
  const config = getComponentConfigByType(type)
  if (!config) return null
  const { Component } = config
  return <Component {...props}></Component>
}

const StatLeftPanel: FC<StatMainPanelPropsType> = ({ selectId, updateSelectId }) => {
  const { showComponentList } = useGetComponentInfo()

  const handleComponentClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    updateSelectId(id)
  }

  const NoneComponent = (
    <div className="flex items-center justify-center h-full">
      <Typography.Text>暂无组件</Typography.Text>
    </div>
  )

  const ShowComponentElement = showComponentList.map(componentInfo => {
    const Component = getComponent(componentInfo)
    const config = getComponentConfigByType(componentInfo.type)
    const { locked, fe_id } = componentInfo
    return (
      Component && (
        <QuestionWrapper
          disabled={config?.group === 'QuestionTitleGroup'}
          key={fe_id}
          isSelect={selectId === fe_id}
          locked={locked}
          onClick={e => handleComponentClick(e, fe_id)}
        >
          {Component}
        </QuestionWrapper>
      )
    )
  })

  return (
    <div className="min-h-full overflow-hidden">
      {showComponentList.length === 0 ? NoneComponent : ShowComponentElement}
    </div>
  )
}

export default StatLeftPanel
