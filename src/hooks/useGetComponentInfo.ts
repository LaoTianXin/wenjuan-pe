import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetComponentInfo = () => {
  const {
    componentList = [],
    selectComponentId = '',
    copyComponent,
  } = useSelector((state: RootState) => state.components)

  const selectComponentInfo = componentList.find(item => item.fe_id === selectComponentId) || null

  const showComponentList = componentList.filter(item => !item.hidden)

  return { componentList, selectComponentId, selectComponentInfo, showComponentList, copyComponent }
}
