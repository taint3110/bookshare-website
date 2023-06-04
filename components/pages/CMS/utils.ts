import { login as loginStaff } from 'API/authenticate'
import { ETokenKey } from 'API/constants'
import { ILoginRequest } from 'interfaces/authenticate'
export const CMS_EMAIL: string = process.env.CMS_EMAIL ?? ''
export const CMS_PASSWORD: string = process.env.CMS_PASSWORD ?? ''
export async function loginCMS(): Promise<void> {
  const loginData: ILoginRequest = {
    email: CMS_EMAIL,
    password: CMS_PASSWORD
  }
  const res = await loginStaff(loginData)
  const { token } = res
  localStorage.setItem(ETokenKey.CMS_ACCESS_TOKEN, token)
}
