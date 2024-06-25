import { useEffect } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import { whiteRouteList, blackRouteList, PathNameEnum } from '@/router/pathNameEnum'

export const useNavPage = (waitUserInfo: boolean) => {
  const nav = useNavigate()
  const { token } = useGetUserInfo()
  const { pathname } = useLocation()
  useEffect(() => {
    if (waitUserInfo) return

    if (token) {
      if (blackRouteList.some(path => pathname === path)) {
        nav(PathNameEnum.HOME)
      }
      return
    }

    if (!whiteRouteList.some(path => pathname === path)) {
      nav(PathNameEnum.LOGIN)
    }
  }, [waitUserInfo, pathname, token])
}
