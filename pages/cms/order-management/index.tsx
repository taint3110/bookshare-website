import { ETokenKey, PLATFORM } from 'API/constants'
import CMSLayout from 'components/Layout/CMSLayout'
import OrderManagement from 'components/pages/CMS/OrderManagement'
import router from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getAuthenticateStorageKey } from 'utils/common'

const OrderManagementPage = () => {
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
    <CMSLayout title={`Order Management | Internal Portal`} topBarTitle="Order Management">
      <OrderManagement />
    </CMSLayout>
  )
}

export default OrderManagementPage
