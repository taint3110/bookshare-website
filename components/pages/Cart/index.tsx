import { HStack, Text } from '@chakra-ui/react'
import CartBookList from './BookList'
import CartUserInfo from './UserInfo'

const Cart = () => {
  return (
    <>
      <HStack pl="280px" pr="280px" marginTop="12" mb="40" alignItems={'flex-start'}>
        <CartBookList />
        <CartUserInfo />
      </HStack>
    </>
  )
}

export default Cart
