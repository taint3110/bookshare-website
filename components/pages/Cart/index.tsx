import { HStack, Text } from '@chakra-ui/react'
import CartBookList from './BookList'

const Cart = () => {
  return (
    <>
      <HStack pl="200px" pr="200px" mt="4" mb="40">
        <CartBookList />
      </HStack>
    </>
  )
}

export default Cart
