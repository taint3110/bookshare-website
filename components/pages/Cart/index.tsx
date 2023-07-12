import { Center, HStack, Text, Image, Stack } from '@chakra-ui/react'
import CartBookList from './BookList'
import CartUserInfo from './UserInfo'
import { mockOrder } from 'components/BookList/components/BookCard/mockData'

const Cart = () => {
  const pendingOrder = mockOrder
  if (pendingOrder == null) {
    return (
      <Stack pl="280px" pr="280px" marginTop="12" mb="40" align={'center'}>
        <Image
          width={600}
          src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
        ></Image>
        <Text fontSize={'2xl'}>Your cart is empty.</Text>
      </Stack>
    )
  }
  return (
    <HStack pl="280px" pr="280px" marginTop="12" mb="40" alignItems={'flex-start'}>
      <CartBookList />
      <CartUserInfo />
    </HStack>
  )
}

export default Cart
