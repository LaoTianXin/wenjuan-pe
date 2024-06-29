import { ComponentsState, ComponentInfoType } from '.'

export const getShowComponentList = (draft: ComponentsState) => {
  return draft.componentList.filter(item => !item.hidden)
}

export const getComponentInfo = (draft: ComponentsState, id?: string) => {
  id ??= draft.selectComponentId
  return draft.componentList.find(item => item.fe_id === id) || null
}

export const getComponentIndexById = (draft: ComponentsState, id?: string) => {
  id ??= draft.selectComponentId
  return draft.componentList.findIndex(item => item.fe_id === id)
}

export const getComponentNextSelectId = (draft: ComponentsState, id?: string) => {
  id ??= draft.selectComponentId
  const showComponentList = getShowComponentList(draft)
  const index = showComponentList.findIndex(item => item.fe_id === id)
  if (index === -1) return ''
  if (showComponentList.length <= 1) return ''
  if (index === showComponentList.length - 1) return showComponentList[index - 1].fe_id
  else return showComponentList[index + 1].fe_id
}

export const insertComponent = (draft: ComponentsState, newComponentInfo: ComponentInfoType) => {
  let insertIndex: number = draft.componentList.length
  if (!newComponentInfo) return
  if (draft.selectComponentId) {
    const index = getComponentIndexById(draft)
    if (index >= 0) {
      insertIndex = index + 1
    }
  }
  draft.componentList.splice(insertIndex, 0, newComponentInfo)
  draft.selectComponentId = newComponentInfo.fe_id
}
