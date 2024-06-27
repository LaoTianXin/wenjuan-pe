import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetComponentInfo = () => {
  const { componentList = [], selectComponentId = '' } = useSelector(
    (state: RootState) => state.components
  )

  return { componentList, selectComponentId }
}
