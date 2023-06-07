import axios, { AxiosResponse } from 'axios'
import { getAuthenticateStorageKey } from 'utils/common'
import { ETokenKey, IHeader, IServerError, PLATFORM, ServerErrorMessage } from './constants'

const { API_URL } = process.env

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