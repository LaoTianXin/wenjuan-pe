import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetPageInfo = () => {
  return useSelector((state: RootState) => state.pageInfo)
}
