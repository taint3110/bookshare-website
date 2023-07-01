import { ETokenKey, PLATFORM } from 'API/constants'
import get from 'lodash/get'
import { NextRouter } from 'next/router'

export function checkValidArray<T>(array?: T[]): boolean {
  return array ? Array.isArray(array) && array.length > 0 : false
}

export function getValidArray<T>(array?: T[]): T[] {
  return checkValidArray<T>(array) ? array || [] : []
}

export function getAuthenticateStorageKey(platform: PLATFORM): ETokenKey {
  switch (platform) {
    case PLATFORM.CMS:
      return ETokenKey.CMS_ACCESS_TOKEN
    default:
      return ETokenKey.WEBSITE_ACCESS_TOKEN
  }
}

export function getQueryValue(router: NextRouter, param: string = 'page', defaultValue: number = 0): number {
  return Number(get(router, `query.${param}`, defaultValue)) || defaultValue
}

export function convertQueryParamToBoolean(queryValue?: string): boolean {
  return (queryValue ?? '').toLowerCase() === 'true'
}

export function formatText(text: string | undefined): string {
  if (text) return text.charAt(0).toUpperCase() + text.slice(1)
  return ''
}
