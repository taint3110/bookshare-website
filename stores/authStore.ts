/* eslint-disable max-lines */
import { getUserDetail, login as loginAPI, signup as signUpAPI, updateProfile } from 'API/authenticate'
import { ETokenKey, PLATFORM } from 'API/constants'
import { getUserById } from 'API/customer/user'
import { handleError } from 'API/error'
import { LoginFormData } from 'components/pages/CMS/AuthenticatePage/components/LoginForm'
import { SignUpFormData } from 'components/pages/CMS/AuthenticatePage/components/SignUpForm'
import { IUser } from 'interfaces/user'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { makeAutoObservable } from 'mobx'
import router from 'next/router'
import { toast } from 'react-toastify'
import routes from 'routes'
import { RootStore } from 'stores'
import { getAccountType, getAuthenticateStorageKey } from 'utils/common'

export default class AuthStore {
  rootStore: RootStore
  token?: ETokenKey = undefined
  user: IUser = {}
  isLogin: boolean = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async getMyUser(platform: PLATFORM): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const currentUser = await getUserDetail(platform)
      this.user = currentUser
      this.rootStore.spinnerStore.hideLoading()
    } catch (error) {
      handleError(error as Error, 'stores/authStore.ts', 'getMyUser')
      this.rootStore.spinnerStore.hideLoading()
      const errorMessage: string = get(error, 'message', '')
      throw new Error(errorMessage)
    }
  }

  setAccessToken(accessToken: ETokenKey, isRemember: boolean, platform: PLATFORM): void {
    const token: ETokenKey = getAuthenticateStorageKey(platform)
    if (isRemember) {
      localStorage.setItem(token, accessToken)
    } else {
      sessionStorage.setItem(token, accessToken)
    }
    this.token = accessToken
  }

  setLogin(isLogin: boolean): void {
    this.isLogin = isLogin
  }

  async getAccessToken(platform: PLATFORM): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const currentUser = await getUserDetail(platform)
      this.user = currentUser
      this.rootStore.spinnerStore.hideLoading()
    } catch (error) {
      handleError(error as Error, 'stores/authStore.ts', 'getAccessToken')
      this.rootStore.spinnerStore.hideLoading()
      this.clearAccessToken(platform)
      toast.error('Your session may expired. Please login again !')
    }
  }

  async login(data: LoginFormData, platform: PLATFORM): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const res = await loginAPI(omit(data, 'isRemember'))
      const { token, accountType } = res
      if (accountType && accountType !== getAccountType(platform)) {
        this.rootStore.spinnerStore.hideLoading()
        throw new Error('Wrong Platform, please try again !')
      }
      if (token) {
        if (data?.isRemember) {
          this.setAccessToken(token, true, platform)
        } else {
          this.setAccessToken(token, false, platform)
        }
        this.getMyUser(platform)

        platform === PLATFORM.CMS && router.push(routes.cms.bookManagement.value)
        platform === PLATFORM.WEBSITE && router.push(routes.home.value)
      }
      this.rootStore.spinnerStore.hideLoading()
      //*INFO: Catch clause variable type annotation must be 'any' or 'unknown' if specified
    } catch (error) {
      this.rootStore.spinnerStore.hideLoading()
      const errorMessage: string = get(error, 'message', '')
      throw new Error(errorMessage)
    }
  }

  async signUp(data: SignUpFormData, platform: PLATFORM): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const user: IUser = await signUpAPI(omit(data, 'confirmPassword'))
      if (user) {
        toast.success('Sign up successfully !')
        if (platform === PLATFORM.WEBSITE) {
          router.push(routes.login.value)
        } else {
          router.push(routes.cms.login.value)
        }
      }
      this.rootStore.spinnerStore.hideLoading()
      //*INFO: Catch clause variable type annotation must be 'any' or 'unknown' if specified
    } catch (error) {
      this.rootStore.spinnerStore.hideLoading()
      const errorMessage: string = get(error, 'message', '')
      throw new Error(errorMessage)
    }
  }

  async getWebsiteAccessToken(): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const accessToken: string = localStorage.getItem(ETokenKey.WEBSITE_ACCESS_TOKEN) ?? ''
      if (accessToken) {
        const currentUser = await getUserDetail(PLATFORM.WEBSITE)
        this.user = currentUser
        this.isLogin = true
      }
      this.rootStore.spinnerStore.hideLoading()
    } catch (error) {
      handleError(error as Error, 'stores/authStore.ts', 'getWebsiteAccessToken')
      this.rootStore.spinnerStore.hideLoading()
      this.isLogin = false
      this.clearAccessToken(PLATFORM.WEBSITE)
    }
  }

  clearAccessToken(platform: PLATFORM): void {
    const token: ETokenKey = getAuthenticateStorageKey(platform)
    localStorage.removeItem(token)
    sessionStorage.removeItem(token)
    this.token = undefined
    this.user = {}
    if (platform === PLATFORM.CMS) {
      router.replace(routes.cms.login.value)
    } else {
      this.isLogin = false
    }
  }

  async updateUserProfile(userData: IUser, platform: PLATFORM): Promise<void> {
    try {
      await updateProfile(userData, platform)
      await this.getMyUser(platform)
    } catch (error) {
      const errorMessage: string = get(error, 'message', '')
      handleError(error as Error, 'stores/authStore.ts', 'updateUserProfile')
      throw new Error(errorMessage)
    }
  }

  async getMyUserById(userId: string): Promise<void> {
    this.rootStore.spinnerStore.showLoading()
    try {
      const currentUser: IUser = await getUserById(userId)
      this.user = currentUser
      this.rootStore.spinnerStore.hideLoading()
    } catch (error) {
      handleError(error as Error, 'stores/authStore.ts', 'getMyUserById')
      this.rootStore.spinnerStore.hideLoading()
      const errorMessage: string = get(error, 'message', '')
      throw new Error(errorMessage)
    }
  }
}
