import request from '../request'

// 登录
export const userLoginService = (data: UserServer.UserLoginProp) => {
  return request.post<UserServer.UserLoginData>('/api/user/login', data)
}

// 注册
export const userRegisterService = (data: UserServer.UserRegisterProp) => {
  return request.post<UserServer.UserRegisterData>('/api/user/register', data)
}

// 获取用户信息
export const userInfoService = () => {
  return request.get<UserServer.UserInfoData>('/api/user/info')
}
