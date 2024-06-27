import { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'

type defaultPropsType = QuestionInputPropsType | QuestionTitlePropsType
export type ComponentPropsType = Partial<defaultPropsType>

export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: defaultPropsType
}

const componentsConfigList: ComponentConfigType[] = [QuestionInputConfig, QuestionTitleConfig]

export const getComponentConfigByType = (type: string) => {
  return componentsConfigList.find(item => item.type === type)
}
