import { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import { PublicProps } from './createPropComponent'

type defaultPropsType = QuestionInputPropsType | QuestionTitlePropsType
export type ComponentPropsType = Partial<defaultPropsType>

type Group = 'QuestionFormGroup' | 'QuestionTitleGroup'

export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: defaultPropsType
  group: Group
  PropComponent: FC<ComponentPropsType & PublicProps>
}

export type ComponentConfigGroupType = {
  title: string
  group: Group
  componentConfigList: ComponentConfigType[]
}

const componentsConfigList: ComponentConfigType[] = [QuestionInputConfig, QuestionTitleConfig]

export const getComponentConfigByType = (type: string) => {
  return componentsConfigList.find(item => item.type === type) || null
}

const initialComponentConfigGroupList: Omit<ComponentConfigGroupType, 'componentConfigList'>[] = [
  {
    title: '本文显示',
    group: 'QuestionTitleGroup',
  },
  {
    title: '用户输入',
    group: 'QuestionFormGroup',
  },
]

export const componentConfigGroupList: ComponentConfigGroupType[] =
  initialComponentConfigGroupList.map(item => {
    const componentConfigList = componentsConfigList.filter(
      componentConfig => componentConfig.group === item.group
    )
    return {
      ...item,
      componentConfigList,
    }
  })
