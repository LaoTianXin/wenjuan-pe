import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetComponentInfo = () => {
  const { componentList = [], selectComponentId = '' } = useSelector(
    (state: RootState) => state.components
  )

  const selectComponentInfo = componentList.find(item => item.fe_id === selectComponentId) || null

  return { componentList, selectComponentId, selectComponentInfo }
}
