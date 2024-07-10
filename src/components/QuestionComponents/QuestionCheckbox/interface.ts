import { ChartProps } from '..'

export interface CheckboxPropsType {
  label: string
  value: string
  checked: boolean
}

export interface QuestionCheckboxPropsType {
  title: string
  checkList: CheckboxPropsType[]
  isVertical: boolean
}

export type QuestionCheckboxChartProps<
  T extends Record<string, string | number> = Record<string, string | number>
> = ChartProps<T>

export const defaultQuestionCheckboxProps: QuestionCheckboxPropsType = {
  title: '问卷标题',
  checkList: [
    {
      label: '选项1',
      value: '1',
      checked: true,
    },
    {
      label: '选项2',
      value: '2',
      checked: false,
    },
  ],
  isVertical: false,
}
