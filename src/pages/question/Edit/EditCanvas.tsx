import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { getComponentConfigByType } from '@/components/QuestionComponents'
import { ComponentInfoType, setSelectComponentId } from '@/store/componentsReducer'
import QuestionWrapper from '@/components/QuestionComponents/QuestionWrapper'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

interface EditCanvasPropsType {
  loading?: boolean
}

const getComponent = ({ type, props = {} }: ComponentInfoType) => {
  const config = getComponentConfigByType(type)
  if (!config) return null
  const { Component } = config
  return <Component {...props}></Component>
}

const EditCanvas: FC<EditCanvasPropsType> = ({ loading = false }) => {
  const dispatch = useDispatch()

  const { showComponentList, selectComponentId } = useGetComponentInfo()

  const handleComponentClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(setSelectComponentId(id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large"></Spin>
      </div>
    )
  }

  return (
    <div className="min-h-full overflow-hidden">
      {showComponentList.map(componentInfo => {
        const Component = getComponent(componentInfo)
        const { locked, fe_id } = componentInfo
        return (
          Component && (
            <QuestionWrapper
              isSelect={selectComponentId === fe_id}
              locked={locked}
              onClick={e => handleComponentClick(e, fe_id)}
              key={fe_id}
            >
              {Component}
            </QuestionWrapper>
          )
        )
      })}
    </div>
  )
}

export default EditCanvas
