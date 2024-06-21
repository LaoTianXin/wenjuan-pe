declare namespace QuestionCard {
  export interface QuestionTable {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    isDeleted: boolean
    createAt: string
  }
}
