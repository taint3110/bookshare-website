import { api, auth } from 'API'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { ICategory } from 'interfaces/category'
import get from 'lodash/get'
import { IFilter } from 'types/query'

export async function getCMSCategory(filter: IFilter<ICategory>): Promise<ICategory[]> {
  try {
    const response = await api.get(`/staff/categories?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/category', 'getCMSCategory')
    throw new Error(errorMessage)
  }
}

export async function getCMSCategoryDetail(id: string, filter?: IFilter<ICategory>): Promise<ICategory> {
  try {
    const response = await api.get(`/staff/categories/${id}?filter=${JSON.stringify(filter)}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/category', 'getCMSCategoryDetail')
    throw new Error(errorMessage)
  }
}

export async function updateCMSCategoryDetail(id: string, category: ICategory): Promise<void> {
  try {
    const response = await api.patch(`/staff/categories/${id}`, category, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/category', 'updateCMSCategoryDetail')
    throw new Error(errorMessage)
  }
}


export async function deleteCategoryById(id: string): Promise<void> {
  try {
    return api.delete(`/staff/categories/${id}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/category', 'deleteCategoryById')
    throw new Error(errorMessage)
  }
}

export async function createNewCategory(category: ICategory): Promise<ICategory> {
  try {
    const response = await api.post(`/staff/categories`, category, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data
  } catch (error) {
    const errorMessage: string = get(error, 'response.data.error.message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/cms/category', 'createNewCategory')
    throw new Error(errorMessage)
  }
}
