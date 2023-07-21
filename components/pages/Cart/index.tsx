import { Container, Divider, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { EBookStatusEnum } from 'enums/book'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import { IOrder } from 'interfaces/order'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { maxMobileWidth, maxTabletWidth } from 'theme/globalStyles'
import { getValidArray } from 'utils/common'
import CartBookList from './BookList'
import CartUserInfo from './UserInfo'

const Cart = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth })
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const { authStore, websiteOrderStore } = useStores()
  const { user } = authStore
  const { websiteOrderList } = websiteOrderStore

  useEffect(() => {
    setIsCollapsed(isMobile || isTabletMobile)
  }, [isMobile, isTabletMobile])

  async function fetchData(): Promise<void> {
    try {
      await authStore.getMyUser(PLATFORM.WEBSITE)
    } catch (error) {
      handleError(error as Error, 'components/pages/Cart/index.tsx', 'fetchData')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (user?.id) {
      websiteOrderStore.fetchWebsiteOrderList({
        where: {
          userId: user?.id
        }
      })
    }
  }, [user])

  function checkIsEmptyCart(): boolean {
    return (
      getValidArray(getValidArray(websiteOrderList?.results)[0]?.bookList).filter(
        (book: IBookWithRelations) => book.bookStatus === EBookStatusEnum.ORDERED
      ).length === 0
    )
  }

  return (
    <>
      {checkIsEmptyCart() && (
        <Stack pl="280px" pr="280px" marginTop="12" mb="40" align={'center'}>
          <Image
            alt="empty cart"
            width={600}
            src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
          ></Image>
          <Text fontSize={'2xl'}>Your cart is empty.</Text>
        </Stack>
      )}
      {isCollapsed &&
        !checkIsEmptyCart() &&
        getValidArray(websiteOrderList?.results)
          .filter(
            (order: IOrder) =>
              getValidArray(order.bookList).filter(
                (book: IBookWithRelations) => book.bookStatus === EBookStatusEnum.ORDERED
              ).length > 0
          )
          .map((order: IOrder) => (
            <Stack
              key={order.id}
              paddingLeft="20px"
              paddingRight="20px"
              marginTop="8"
              marginBottom="12"
              spacing={4}
              alignItems={'flex-start'}
            >
              <Container width={'100%'}>
                <CartBookList order={order} />
              </Container>
              <Container width={'100%'}>
                <CartUserInfo order={order} />
              </Container>
              <Divider />
            </Stack>
          ))}
      {!isCollapsed &&
        !checkIsEmptyCart() &&
        getValidArray(websiteOrderList?.results)
          .filter(
            (order: IOrder) =>
              getValidArray(order.bookList).filter(
                (book: IBookWithRelations) => book.bookStatus === EBookStatusEnum.ORDERED
              ).length > 0
          )
          .map((order: IOrder) => (
            <>
              <HStack key={order?.id} marginTop="8" marginBottom="12" alignItems="flex-start" justify="center">
                <Container marginRight={0}>
                  <CartBookList order={order} />
                </Container>
                <Container marginLeft={0}>
                  <CartUserInfo order={order} />
                </Container>
              </HStack>
              <Divider />
            </>
          ))}
    </>
  )
}

export default observer(Cart)
