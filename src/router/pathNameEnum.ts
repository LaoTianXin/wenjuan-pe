export enum PathNameEnum {
  HOME = '/',
  MANAGE = '/manage',
  MANAGE_LIST = '/manage/list',
  MANAGE_STAR = '/manage/star',
  MANAGE_TRASH = '/manage/trash',
  LOGIN = '/login',
  REGISTER = '/register',
  QUESTION_STAT = '/question/stat',
  QUESTION_EDIT = '/question/edit',
}

export const whiteRouteList = [PathNameEnum.LOGIN, PathNameEnum.REGISTER, PathNameEnum.HOME]

export const blackRouteList = [PathNameEnum.LOGIN, PathNameEnum.REGISTER]
