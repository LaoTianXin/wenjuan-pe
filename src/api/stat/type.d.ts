declare namespace StatServer {
  interface ComponentType {
    [key: string]: string
  }

  export type StatListData = Pages<ComponentType>
}
