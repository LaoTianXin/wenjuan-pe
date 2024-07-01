export interface OptionType {
  label: string
  value: string
}

export interface QuestionRadioPropsType {
  title: string
  value: string
  options: OptionType[]
  isVertical: boolean
}

export const defaultQuestionRadioProps: QuestionRadioPropsType = {
  title: '问卷标题',
  value: '1',
  options: [
    {
      label: '选项1',
      value: '1',
    },
    {
      label: '选项2',
      value: '2',
    },
  ],
  isVertical: false,
}
