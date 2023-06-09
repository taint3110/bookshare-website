import { Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { IBookWithRelations } from 'interfaces/book'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BookCard = (props: IBookWithRelations) => {
  const { id, title, author, price, bonusPointPrice, publisher, language, bookStatus, media } = props
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push('/books/' + id) // Replace with the desired path
  }

  return (
    <Link href={'/books/' + id}>
      <Card>
        <CardBody>
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
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            flex={1}
            colorScheme="teal"
            variant={bookStatus == 'available' ? 'solid' : 'flushed'}
            isDisabled={bookStatus == 'available' ? false : true}
          >
            {bookStatus == 'available' ? 'Add to cart' : 'Unavailable'}
          </Button>
        </CardFooter>
      </Card>

      {/* MODAL THONG BAO THEM VAO CART THANH CONG  */}
      {/* <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
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
      </Modal> */}
    </Link>
  )
}

function formatText(text: string) {}

export default BookCard
