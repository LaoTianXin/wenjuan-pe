import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ComponentsState } from '@/store/componentsReducer'
import { ComponentPropsType } from '@/components/QuestionComponents'

export const useGetComponentInfo = <T extends ComponentPropsType = any>() => {
  const {
    componentList = [],
    selectComponentId = '',
    copyComponent,
  } = useSelector((state: RootState) => state.components) as ComponentsState<T>

  const selectComponentInfo = componentList.find(item => item.fe_id === selectComponentId) || null

  const showComponentList = componentList.filter(item => !item.hidden)

  return { componentList, selectComponentId, selectComponentInfo, showComponentList, copyComponent }
}
