import { EAccountType } from 'enums/user'
import { PLATFORM } from 'API/constants'

export interface ILoginRequest {
  email: string
  password: string
}

export interface IForgotPasswordRequest {
  email: string
  platform: PLATFORM
}

export interface IResetPasswordRequest {
  newPassword: string
  confirmPassword: string
  resetPasswordToken: string
}

export interface IWebsiteLoginResponse {
  token: string
  accountType: EAccountType
  userId?: string
  isEmailVerified: boolean
}
