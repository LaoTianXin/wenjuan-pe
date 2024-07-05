import { configureStore } from '@reduxjs/toolkit'
import undoable, { StateWithHistory } from 'redux-undo'
import user, { UserState } from './userReducer'
import components, { ComponentsState } from './componentsReducer'
import pageInfo, { PageInfoType } from './pageInfoReducer'

export interface RootState {
  user: UserState
  components: StateWithHistory<ComponentsState>
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user,

    components: undoable(components, {
      limit: 20,
      syncFilter: true,
      filter: action => {
        const actionTypeList = [
          'resetComponentList',
          'setSelectComponentId',
          'selectPrevComponent',
          'selectNextComponent',
          'copyComponentInfo',
        ]
        return !actionTypeList.map(item => `components/${item}`).includes(action.type)
      },
    }),
    pageInfo,
  },
})
