import { StorageKeyEnum } from '../enum/StorageEnum'

export function setToken(token: string) {
  localStorage.setItem(StorageKeyEnum.TOKEN, token)
}

export function getToken() {
  return localStorage.getItem(StorageKeyEnum.TOKEN) || ''
}

export function removeToken() {
  localStorage.removeItem(StorageKeyEnum.TOKEN)
}
