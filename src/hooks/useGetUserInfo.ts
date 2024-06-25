import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const useGetUserInfo = () => {
  const { username, nickname, token } = useSelector((state: RootState) => state.user)
  return { username, nickname, token }
}
