import MainLayout from 'components/Layout/MainLayout'
import Cart from 'components/pages/Cart'

const CartPage = () => {
  return (
    <MainLayout title={`BookShare | Cart`}>
      <Cart />
    </MainLayout>
  )
}

export default CartPage
