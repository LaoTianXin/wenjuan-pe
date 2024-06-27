import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { userInfoService } from '../api'
import { useGetUserInfo } from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { setUserInfoReducer, logoutReducer } from '@/store/userReducer'

export const useLoadUserData = () => {
  const [waiting, setWaiting] = useState(true)
  const { username, token } = useGetUserInfo()
  const dispatch = useDispatch()

  const { run: getUserInfo } = useRequest(userInfoService, {
    manual: true,
    onSuccess(res) {
      const { nickname, username } = res
      dispatch(setUserInfoReducer({ nickname, username }))
    },
    onError() {
      dispatch(logoutReducer())
    },
    onFinally() {
      setWaiting(false)
    },
  })

  useEffect(() => {
    if (!token) {
      return setWaiting(false)
    }
    if (!username) {
      getUserInfo()
    } else {
      setWaiting(false)
    }
  }, [token])

  return { waiting }
}
