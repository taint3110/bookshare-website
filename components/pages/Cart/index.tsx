import { Center, HStack, Text, Image, Stack, Container } from '@chakra-ui/react'
import CartBookList from './BookList'
import CartUserInfo from './UserInfo'
import { mockOrder } from 'components/BookList/components/BookCard/mockData'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { maxMobileWidth, maxTabletWidth } from 'theme/globalStyles'

const Cart = () => {
  const pendingOrder = mockOrder
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth })
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })

  useEffect(() => {
    setIsCollapsed(isMobile || isTabletMobile)
  }, [isMobile, isTabletMobile])
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
  if (isCollapsed) {
    return (
      <Stack
        paddingLeft="20px"
        paddingRight="20px"
        marginTop="12"
        marginBottom="40"
        spacing={4}
        alignItems={'flex-start'}
      >
        <Container width={'100%'}>
          <CartBookList />
        </Container>
        <Container width={'100%'}>
          <CartUserInfo />
        </Container>
      </Stack>
    )
  }
  return (
    <HStack paddingLeft="280px" paddingRight="280px" marginTop="12" marginBottom="40" alignItems={'flex-start'}>
      <CartBookList />
      <CartUserInfo />
    </HStack>
  )
}

export default Cart
