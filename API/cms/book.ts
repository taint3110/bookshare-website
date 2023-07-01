import { api, auth } from 'API'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { IBook, IBookWithRelations } from 'interfaces/book'
import get from 'lodash/get'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

export async function getCMSBooks(filter: IFilter<IBook>): Promise<PaginationList<IBook>> {
  try {
    const response = await api.get(`/staff/books/paginate?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/book', 'getCMSBooks')
    throw new Error(errorMessage)
  }
}

export async function deleteBookById(id: string): Promise<void> {
  try {
    return api.delete(`/staff/books/${id}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/book', 'deleteBookById')
    throw new Error(errorMessage)
  }
}

export async function createNewBook(book: IBook): Promise<IBook> {
  try {
    const response = await api.post(`/staff/books`, book, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/book', 'createNewBook')
    throw new Error(errorMessage)
  }
}

export async function updateBookById(book: IBook, categoryIds?: string[]): Promise<void> {
  try {
    return api.patch(`/staff/books/${book?.id}?categoryIds=${categoryIds}`, book, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/book', 'updateBookById')
    throw new Error(errorMessage)
  }
}

export async function getCMSBookDetail(id?: string): Promise<IBookWithRelations> {
  try {
    const response = await api.get(`/staff/books/${id}`, { headers: auth(PLATFORM.CMS) })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/book', 'getCMSBookDetail')
    throw new Error(errorMessage)
  }
}