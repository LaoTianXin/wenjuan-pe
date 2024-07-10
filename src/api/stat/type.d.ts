declare namespace StatServer {
  interface ComponentType {
    [key: string]: string
  }

  export type StatListParams = Partial<{ id: string } & SearchOptions>
  export type StatListData = Pages<ComponentType>

  export type StatChartParams = Partial<{ id: string; fe_id: string }>
  export type StatChartList = { count: number; name: string }[]
  export type StatChartData = { chartList: StatChartList }
}
