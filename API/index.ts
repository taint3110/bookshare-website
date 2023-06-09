import axios from 'axios'
import { getAuthenticateStorageKey } from 'utils/common'
import { ETokenKey, PLATFORM } from './constants'

const API_URL = 'http://localhost:3001/'

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