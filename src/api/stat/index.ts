import request from '../request'
export const getStatService = () => {
  return request.get<StatServer.StatListData>('/api/stat')
}
