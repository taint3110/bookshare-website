import { checkValidArray, getValidArray } from 'utils/common'

import dayjs from 'dayjs'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
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

export function getCategoriesOptionsSelect(categoryList: ICategory[]): IOption[] {
  if (checkValidArray(categoryList)) {
    return getValidArray(categoryList).map((category: ICategory, index: number) => {
      return {
        value: category?.id ?? '',
        label: category?.name ?? ''
      }
    })
  }
  return []
}

export function getBookFormValues(bookDetail: Partial<IBookWithRelations>): Partial<IBookWithRelations> {
  const bookFormValues: Partial<IBookWithRelations> = {
    ...bookDetail,
    formSeries: { label: bookDetail?.series?.title ?? '', value: bookDetail?.series?._id ?? '' },
    formCategories: bookDetail?.categories?.map((category: ICategory) => {
      return {
        label: category?.name ?? '',
        value: category?._id ?? ''
      }
    }),
    availableStartDate: dayjs(bookDetail?.availableStartDate).toDate(),
    availableEndDate: dayjs(bookDetail?.availableEndDate).toDate(),
    releaseDate: dayjs(bookDetail?.releaseDate).toDate(),
    bookStatus: bookDetail?.bookStatus,
    author: bookDetail?.author,
    formMedia: bookDetail?.media?.imageUrl ?? ''
  }
  return bookFormValues
}
