import { ETokenKey, PLATFORM } from 'API/constants'
import MainLayout from 'components/Layout/MainLayout'
import Cart from 'components/pages/Cart'
import { useStores } from 'hooks/useStores'
import router from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'
import { getAuthenticateStorageKey } from 'utils/common'

const CartPage = () => {
  const { authStore } = useStores()
  useEffect(() => {
    const token: ETokenKey = getAuthenticateStorageKey(PLATFORM.WEBSITE)
    const userToken: string = localStorage.getItem(token) ?? sessionStorage.getItem(token) ?? ''
    if (!userToken) {
      router.replace(routes.login.value)
    } else {
      authStore.getMyUser(PLATFORM.WEBSITE)
    }
  }, [])
  return (
    <MainLayout title={`BookShare | Cart`}>
      <Cart />
    </MainLayout>
  )
}

export default CartPage
