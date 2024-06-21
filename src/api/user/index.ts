import request from '../request'

// 登录
export const userLoginService = (data: User.UserLoginProp) => {
  return request.post<User.UserLoginData>('/api/user/login', data)
}

// 注册
export const userRegisterService = (data: User.UserRegisterProp) => {
  return request.post<User.UserRegisterData>('/api/user/register', data)
}

// 获取用户信息
export const userInfoService = () => {
  return request.get<User.UserInfoData>('/api/user/info')
}
