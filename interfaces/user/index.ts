import { ERole, EAccountType } from 'enums/user'

export interface IUser {
  _id?: string
  id?: string
  email?: string
  name?: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  phoneNumber?: string
  password?: string
  lastSignInAt?: Date
  sendInvitationEmailCount?: number
  sendVerificationEmailCount?: number
  isEmailVerified?: boolean
  newPassword?: string
  confirmPassword?: string
  role?: ERole
  accountType?: EAccountType
  isActive?: boolean
}

export interface IUserWithPassword extends Partial<IUser> {
  password: string
}

export interface ICustomerServiceInfo {
  fullName: string
  phoneNumber: string
}
