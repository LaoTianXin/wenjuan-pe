declare interface BaseResponseType {
  errno: 0 | 10001 | 10002 | 10003
  data: any
  msg?: string
}

declare interface Pages<T> {
  total: number
  list: T[]
}

declare interface SearchOptions {
  keywords: string
  page: number
  pageSize: number
}
