import React, { FC, MouseEvent } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addComponent, ComponentInfoType } from '@/store/componentsReducer'
import {
  componentConfigGroupList,
  ComponentConfigGroupType,
  ComponentConfigType,
} from '@/components/QuestionComponents'
import QuestionWrapper from '@/components/QuestionComponents/QuestionWrapper'

const { Title } = Typography

const getComponentItemRender = (
  { title = '', componentConfigList = [] }: ComponentConfigGroupType,
  index: number
) => {
  const dispatch = useDispatch()

  const handleWrapperClick = (
    e: MouseEvent,
    {
      title,
      type,
      defaultProps,
    }: CommonAttributes<ComponentInfoType, ComponentConfigType> &
      Pick<ComponentConfigType, 'defaultProps'>
  ) => {
    e.stopPropagation()
    const componentInfo: ComponentInfoType = {
      fe_id: nanoid(5),
      title,
      type,
      props: defaultProps,
      hidden: false,
      locked: false,
    }
    dispatch(addComponent(componentInfo))
  }

  return (
    <div key={index}>
      <Title style={{ fontSize: '16px', marginTop: index ? '20px' : '5px' }}>{title}</Title>
      {componentConfigList.map(({ Component, type, title, defaultProps }) => {
        return (
          <QuestionWrapper
            onClick={e => handleWrapperClick(e, { type, title, defaultProps })}
            key={type}
          >
            <Component />
          </QuestionWrapper>
        )
      })}
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div className="h-[720px] overflow-auto">
      {componentConfigGroupList.map((item, index) => {
        return getComponentItemRender(item, index)
      })}
    </div>
  )
}

export default ComponentLib
