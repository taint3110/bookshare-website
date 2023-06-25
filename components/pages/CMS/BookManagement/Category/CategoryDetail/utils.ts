import { getValidArray } from 'utils/common'

import router from 'next/router'
import routes from 'routes'

export function mapAuthor(author: string): string[] {
  return getValidArray(author.split(','))
}

export function redirect(): void {
  router.push(`${routes.cms.bookManagement.value}?index=2&page=${router.query.page}&pageSize=${router.query.pageSize}`)
}
