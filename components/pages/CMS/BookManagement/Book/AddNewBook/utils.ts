import { checkValidArray, getValidArray } from 'utils/common'

import { IOption } from 'interfaces/common'
import { ISeries } from 'interfaces/series'
import router from 'next/router'
import routes from 'routes'
import { PaginationList } from 'types'

export function mapAuthor(author: string): string[] {
  return getValidArray(author.split(','))
}

export function redirect(): void {
  router.push(`${routes.cms.bookManagement.value}?index=0&page=${router.query.page}&pageSize=${router.query.pageSize}`)
}

export function getOptionsSelect(seriesList: PaginationList<ISeries>): IOption[] {
  if (checkValidArray(seriesList?.results)) {
    return getValidArray(seriesList?.results).map((series: ISeries, index: number) => {
      return {
        value: series?.id ?? '',
        label: series?.title ?? ''
      }
    })
  }
  return []
}
