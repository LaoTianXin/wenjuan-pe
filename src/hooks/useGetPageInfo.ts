import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetPageInfo = () => {
  const {
    title = '',
    desc = '',
    js = '',
    css = '',
  } = useSelector((state: RootState) => state.pageInfo)

  return { title, desc, js, css }
}
