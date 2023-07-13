import { api, auth } from 'API'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { IBook, IBookWithRelations } from 'interfaces/book'
import { get } from 'lodash'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

export async function getWebsiteBookDetail(id?: string): Promise<IBookWithRelations> {
  try {
    const response = await api.get(`/staff/books/${id}`, { headers: auth(PLATFORM.WEBSITE) })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/website/book', 'getWebsiteBookDetail')
    throw new Error(errorMessage)
  }
}
export async function getWebsiteBooks(filter: IFilter<IBook>): Promise<PaginationList<IBook>> {
  try {
    const response = await api.get(`/staff/books/paginate?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.WEBSITE)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/website/book', 'getWebsiteBooks')
    throw new Error(errorMessage)
  }
}
