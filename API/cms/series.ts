import { api, auth } from 'API'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { ISeries } from 'interfaces/series'
import get from 'lodash/get'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

export async function getCMSSeries(filter: IFilter<ISeries>): Promise<ISeries[]> {
  try {
    const response = await api.get(`/staff/series?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'getCMSSeries')
    throw new Error(errorMessage)
  }
}

export async function deleteSeriesById(id: string): Promise<void> {
  try {
    return api.delete(`/staff/series/${id}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'deleteSeriesById')
    throw new Error(errorMessage)
  }
}
