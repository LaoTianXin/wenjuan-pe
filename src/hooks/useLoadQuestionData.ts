import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { resetComponentList, setSelectComponentId } from '@/store/componentsReducer'
import { resetPageInfoReducer } from '@/store/pageInfoReducer'
import { getQuestionByIdService } from '../api'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()

  const dispatch = useDispatch()

  const {
    loading,
    error,
    data,
    run: getQuestionById,
  } = useRequest(() => getQuestionByIdService(id), {
    manual: true,
  })

  useEffect(() => {
    const {
      componentList = [],
      title = '',
      desc = '',
      js = '',
      css = '',
      _id = '',
      isPublished = false,
    } = data || {}
    if (componentList.length) {
      const id = componentList[0].fe_id
      dispatch(setSelectComponentId(id))
    }
    dispatch(resetPageInfoReducer({ title, desc, js, css, isPublished, _id }))
    dispatch(resetComponentList(componentList))
  }, [data])

  useEffect(() => {
    if (!id) return
    getQuestionById()
  }, [id])

  return { loading, error }
}
