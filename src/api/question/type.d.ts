declare namespace QuestionServer {
  interface ComponentType {
    fe_id: string
    type: string
    title: string
    props: Record<string, string>
    hidden: boolean
    locked: boolean
  }

  export interface QuestionTable {
    readonly _id: id
    readonly answerCount: number
    readonly createAt: string
    title: string
    desc: string
    js: string
    css: string
    isPublished: boolean
    isStar: boolean
    isDeleted: boolean
    componentList: ComponentType[]
  }

  export type id = string

  export type QuestionItemData = Pick<QuestionTable, '_id'>

  export type QuestionListProp = Partial<SearchOptions & Omit<QuestionTable, '_id' | 'title'>>
  export type QuestionListData = Pages<QuestionTable>

  export type QuestionCreateProp = Partial<PickWritable<QuestionTable>>
  export type QuestionCreateData = QuestionItemData

  export type QuestionUpdateProp = Partial<PickWritable<QuestionTable>>
  export type QuestionUpdateData = QuestionItemData

  export type QuestionDeleteProp = QuestionTable['_id'][]
  export type QuestionDeleteData = QuestionItemData[]

  export type QuestionDetailData = QuestionTable

  export type QuestionDuplicateData = QuestionItemData
}
