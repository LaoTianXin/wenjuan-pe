declare namespace QuestionCard {
  export interface QuestionProp {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createAt: string
  }
}
