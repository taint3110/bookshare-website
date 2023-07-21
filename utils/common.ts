import { ETokenKey, PLATFORM } from 'API/constants'
import { EAccountType } from 'enums/user'
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

export function getAccountType(platform: PLATFORM): EAccountType {
  switch (platform) {
    case PLATFORM.CMS:
      return EAccountType.STAFF
    default:
      return EAccountType.CUSTOMER
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

export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export function removeItemOnce<T>(arr: Array<T>, value: T) {
  var index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export function formatDate(date = new Date()) {
  var day, month, year

  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return day + '/' + month + '/' + year
}
