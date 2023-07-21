import { api } from 'API'
import { handleError } from 'API/error'
import { AxiosResponse } from 'axios'
import { IUser } from 'interfaces/user'
import get from 'lodash/get'

export async function getUserById(userId: string): Promise<IUser> {
  try {
    const response: AxiosResponse = await api.get(`/customer/users/${userId}`)
    return response?.data
  } catch (error) {
    const errorMessage: string = get(error, 'message', '') || JSON.stringify(error)
    handleError(error as Error, 'API/customer/user', 'getUserById')
    throw new Error(errorMessage)
  }
}
