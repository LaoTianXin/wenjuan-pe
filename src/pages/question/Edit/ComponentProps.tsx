import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { updateComponentProp } from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfigByType } from '@/components/QuestionComponents'

const NoneProps = <div className="text-center">暂无属性</div>

const ComponentProps: FC = () => {
  const dispatch = useDispatch()

  const { selectComponentInfo } = useGetComponentInfo()
  if (selectComponentInfo === null) return NoneProps

  const { type, props, fe_id, locked } = selectComponentInfo
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig === null) return NoneProps

  const { PropComponent } = componentConfig

  const handlePropChange = (e: ComponentPropsType) => {
    dispatch(updateComponentProp({ fe_id, props: e }))
  }

  return (
    <div>
      <PropComponent {...props} onChange={handlePropChange} locked={locked}></PropComponent>
    </div>
  )
}

export default ComponentProps
