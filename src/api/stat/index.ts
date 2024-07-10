import request from '../request'
export const getStatService = (params: StatServer.StatListParams) => {
  return request.get<StatServer.StatListData>('/api/stat', { params })
}

export const getStatChartService = (params: StatServer.StatChartParams) => {
  return request.get<StatServer.StatChartData>('/api/stat/chart', { params })
}
