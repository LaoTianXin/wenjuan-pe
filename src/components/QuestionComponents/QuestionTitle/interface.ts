export interface QuestionTitlePropsType {
  title: string
  level: 1 | 2 | 3
  isCenter: boolean
}

export const defaultQuestionTitleProps: QuestionTitlePropsType = {
  title: '一行标题',
  level: 1,
  isCenter: false,
}
