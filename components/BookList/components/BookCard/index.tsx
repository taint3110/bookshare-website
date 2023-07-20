import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { PLATFORM } from 'API/constants'
import { handleError } from 'API/error'
import { EBookStatusEnum } from 'enums/book'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import capitalize from 'lodash/capitalize'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'

const BookCard = (props: IBookWithRelations) => {
  const { id, title, author, price, bonusPointPrice, publisher, language, bookStatus, media } = props
  const router = useRouter()
  const { authStore, websiteOrderStore } = useStores()
  const { currentOrder } = websiteOrderStore
  const { user } = authStore
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (id) router.push('/books/' + id)
  }
  const [currentBookStatus, setCurrentBookStatus] = useState<EBookStatusEnum>(bookStatus ?? EBookStatusEnum.AVAILABLE)

  async function orderBook(): Promise<void> {
    try {
      if (currentBookStatus !== EBookStatusEnum.AVAILABLE) {
        return
      }
      if (!user?.id) {
        await authStore.getMyUser(PLATFORM.WEBSITE)
      }
      if (user?.id) {
        console.log(2)
        await websiteOrderStore.fetchWebsiteOrderList({
          where: {
            userId: user?.id
          }
        })
      }
      if (user?.id) {
        const orderedBook: IBookWithRelations = {
          ...omit(props, 'categories', 'media', '_id', 'series'),
          orderId: currentOrder?.id ?? '',
          bookStatus: EBookStatusEnum.ORDERED,
          updatedAt: new Date()
        }
        setCurrentBookStatus(EBookStatusEnum.ORDERED)
        await websiteOrderStore.updateOrder({
          ...currentOrder,
          bookList: [...getValidArray(currentOrder?.bookList), orderedBook],
          userId: user?.id
        })
      }
      toast.success('Add book to Cart successfully!')
    } catch (error) {
      handleError(error as Error, 'components/pages/BookDetail/index.tsx', 'orderBook')
    }
  }

  return (
    // <Link href={'/books/' + id}>
    <Card>
      <CardBody onClick={handleClick}>
        <Image
          src={media?.imageUrl ?? 'https://via.placeholder.com/150'}
          boxSize="sm"
          objectFit="contain"
          alt={title}
          borderRadius="sm"
        />
        <Stack mt="4" spacing="1">
          <Heading size="sm">{title}</Heading>
          <Text>{author}</Text>
          <Text color="teal.600" fontSize="xl">
            {price}
          </Text>
          <Text color="teal.600" fontSize="xl">
            {bonusPointPrice}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          flex={1}
          colorScheme="teal"
          variant={currentBookStatus == EBookStatusEnum.AVAILABLE ? 'solid' : 'flushed'}
          isDisabled={currentBookStatus == EBookStatusEnum.AVAILABLE ? false : true}
          onClick={orderBook}
        >
          {currentBookStatus == EBookStatusEnum.AVAILABLE ? 'Add to cart' : capitalize(EBookStatusEnum.UNAVAILABLE)}
        </Button>
      </CardFooter>
    </Card>
  )

  {
    /* MODAL THONG BAO THEM VAO CART THANH CONG  */
  }
  {
    /* <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text align={'center'} mb="1rem">
              Add book to Cart successfully!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="grey" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Go to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */
  }
  // </Link>
}

function formatText(text: string) {}

export default observer(BookCard)
