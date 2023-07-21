export interface IServerError {
  statusCode?: number
  name?: string
  message?: string | ServerErrorMessage
  code?: string
  details?: IErrorDetails[]
}

export enum ETokenKey {
  WEBSITE_ACCESS_TOKEN = 'userToken',
  OWNER_ACCESS_TOKEN = 'ownerUserToken',
  CMS_ACCESS_TOKEN = 'cmsUserToken'
}

export enum PLATFORM {
  CMS = 'cms',
  WEBSITE = 'website'
}

interface IErrorDetails {
  code: string
  info: IErrorInfo
  message: ServerErrorMessage | string
  path: string
}

export enum ServerErrorMessage {
  PASSWORD_MINIMUM_LENGTH_REQUIRED = 'should NOT be shorter than 8 characters',
  PASSWORD_INVALID = 'Password is not valid',
  USER_NOT_FOUND = 'User not found',
  PASSWORD_CONFIRM_INVALID = 'New password and confirm password is not match',
  JWT_EXPIRED = 'Error verifying token : jwt expired',
  UNAVAILABLE_USER = 'Error verifying token : unavailable user.',
  EMAIL_FORMAT = 'should match format "email"'
}

interface IErrorInfo {
  missingProperty: string
}

export interface IErrorOption {
  type: string
  message: string
}

export interface Count {
  count: number
}

export interface IHeader {
  authorization?: string
}

export interface PaginationList<T> {
  results: T[]
  totalCount: number
}
