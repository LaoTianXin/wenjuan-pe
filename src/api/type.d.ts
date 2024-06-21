declare interface Pages<T> {
  total: number
  list: T[]
}

declare interface SearchOptions {
  keywords: string
  page: number
  pageSize: number
}

declare namespace Question {
  export type QuestionServerProp = Partial<SearchOptions & Omit<QuestionDataProp, '_id' | 'title'>>

  export interface QuestionDataProp {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createAt: string
    isDeleted: boolean
  }
}
