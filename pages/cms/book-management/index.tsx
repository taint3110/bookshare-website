import { ETokenKey, PLATFORM } from 'API/constants'
import CMSLayout from 'components/Layout/CMSLayout'
import BookManagement from 'components/pages/CMS/BookManagement'
import router from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getAuthenticateStorageKey } from 'utils/common'

const BookManagementPage = () => {
  useEffect(() => {
    const token: ETokenKey = getAuthenticateStorageKey(PLATFORM.CMS)
    const userToken: string = localStorage.getItem(token) ?? sessionStorage.getItem(token) ?? ''
    if (!userToken) {
      toast.error('Please login to continue', {
        toastId: 'Login'
      })
      router.replace(routes.cms.login.value)
    }
  }, [])

  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <BookManagement />
    </CMSLayout>
  )
}

export default BookManagementPage
