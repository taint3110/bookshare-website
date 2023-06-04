import { ETokenKey, PLATFORM } from "API/constants"

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