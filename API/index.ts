import axios, { AxiosResponse } from 'axios'
import debounce from 'lodash/debounce'
import Router from 'next/router'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getAuthenticateStorageKey } from 'utils/common'
import { ETokenKey, IServerError, PLATFORM, ServerErrorMessage } from './constants'
import get from 'lodash/get'

const API_URL = 'https://starfish-app-mzayt.ondigitalocean.app/'

export const api = axios.create({
  baseURL: API_URL
})

export function auth(type: PLATFORM): any {
  if (typeof window === 'undefined') {
    return {}
  }
  const token: ETokenKey = getAuthenticateStorageKey(type)
  const accessToken = localStorage.getItem(token) ?? (sessionStorage.getItem(token) || '')
  return { authorization: `Bearer ${accessToken}` }
}

function redirectLogin(): void {
  if (Router.pathname.includes(PLATFORM.CMS)) {
    localStorage.removeItem(ETokenKey.CMS_ACCESS_TOKEN)
    Router.replace(routes.cms.login.value)
  } else {
    localStorage.removeItem(ETokenKey.WEBSITE_ACCESS_TOKEN)
  }
}

function handleUnauthorized(): void {
  toast.error('Your session has expired. Please login again.')
  redirectLogin()
}

const handleUnauthorizedWithDebounce = debounce(handleUnauthorized, 500)

api.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  ({ response }: { response: AxiosResponse<{ error: IServerError }> }) => {
    if (!response) {
      return console.log('api interceptors -> response', 'No response, homeroom API may not ready')
    }
    if (response?.status === 401) {
      const errorMessage: string = get(response, 'data.error.message', '') || JSON.stringify(response)
      console.log('api interceptors -> response', errorMessage)
      if (errorMessage === ServerErrorMessage.PASSWORD_INVALID || errorMessage === ServerErrorMessage.USER_NOT_FOUND) {
        return Promise.reject(response)
      }
      return handleUnauthorizedWithDebounce()
    }
    return Promise.reject(response?.data?.error)
  }
)
