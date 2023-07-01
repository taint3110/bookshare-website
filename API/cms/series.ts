import { api, auth } from 'API'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { ISeries } from 'interfaces/series'
import get from 'lodash/get'
import { PaginationList } from 'types'
import { IFilter } from 'types/query'

export async function getCMSSeries(filter: IFilter<ISeries>): Promise<PaginationList<ISeries>> {
  try {
    const response = await api.get(`/staff/series/paginate?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'getCMSSeries')
    throw new Error(errorMessage)
  }
}

export async function getCMSSeriesDetail(id: string, filter?: IFilter<ISeries>): Promise<ISeries> {
  try {
    const response = await api.get(`/staff/series/${id}?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'getCMSSeriesDetail')
    throw new Error(errorMessage)
  }
}

export async function updateCMSSeriesDetail(id: string, series?: ISeries): Promise<void> {
  try {
    const response = await api.patch(`/staff/series/${id}`, series, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'updateCMSSeriesDetail')
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

export async function createNewSeries(series: ISeries): Promise<ISeries> {
  try {
    const response = await api.post(`/staff/series`, series, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/series', 'createNewSeries')
    throw new Error(errorMessage)
  }
}
