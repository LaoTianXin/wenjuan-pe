import { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextAreaConfig, { QuestionTextAreaPropsType } from './QuestionTextArea'
import QuestionRadioConfig, {
  QuestionRadioPropsType,
  QuestionRadioChartProps,
} from './QuestionRadio'
import QuestionCheckboxConfig, {
  QuestionCheckboxPropsType,
  QuestionCheckboxChartProps,
} from './QuestionCheckbox'
import { PublicProps } from './utilComponent/createPropComponent'

export type ChartProps<
  T extends Record<string, string | number> = Record<string, string | number>
> = {
  dataKey: keyof T & string
  nameKey: keyof T & string
  data: T[]
}

type defaultPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextAreaPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType

type QuestionChartPropsType = QuestionRadioChartProps | QuestionCheckboxChartProps

export type ComponentPropsType = Partial<defaultPropsType>

type Group = 'QuestionFormGroup' | 'QuestionTitleGroup'

export type ComponentConfigType<
  T extends defaultPropsType = any,
  F extends QuestionChartPropsType = ChartProps
> = {
  title: string
  type: string
  Component: FC<Partial<T>>
  defaultProps: T
  group: Group
  PropComponent: FC<Partial<T> & PublicProps>
  ChartComponent?: FC<Partial<F>>
  meta?: Record<string, any>
}

export type ComponentConfigGroupType = {
  title: string
  group: Group
  componentConfigList: ComponentConfigType[]
}

const componentsConfigList: ComponentConfigType[] = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextAreaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
]

export const getComponentConfigByType = <
  T extends defaultPropsType = any,
  F extends QuestionChartPropsType = ChartProps
>(
  type: string
) => {
  return (
    (componentsConfigList.find(item => item.type === type) as ComponentConfigType<T, F>) || null
  )
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
