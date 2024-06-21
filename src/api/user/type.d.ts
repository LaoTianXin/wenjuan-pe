declare namespace User {
  export interface UserInfoTable {
    readonly createAt: string
    nickname: string
    username: string
    password: string
  }

  export type UserLoginProp = Pick<UserInfoTable, 'username' | 'password'>
  export interface UserLoginData {
    token: string
  }

  export type UserRegisterProp = Pick<UserInfoTable, 'nickname' | 'username' | 'password'>
  export type UserRegisterData = Record<string, string>

  export type UserInfoData = UserInfoTable
}
