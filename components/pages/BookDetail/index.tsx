import {
  Box,
  Flex,
  Stack,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Button,
  Divider,
  Center
} from '@chakra-ui/react'
import { IMockBook, mockBooks } from 'components/BookList/components/BookCard/mockData'
import BookListNoFilter from 'components/BookListNoFilter'
import { textGrey500 } from 'theme/globalStyles'
import { formatText, getValidArray } from 'utils/common'
import Paragraph from './FadedParagraph'

const BookDetail = (props: IMockBook) => {
  const {
    title,
    author,
    price,
    bonusPointPrice,
    bookStatus,
    publisher,
    language,
    bookImages,
    categories,
    condition,
    cover
  } = props

  // Cái này đúng ra cũng lấy từ props luôn
  const bookDescription =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, aperiam minima labore veniam, neque similique pariatur perferendis adipisci libero veritatis dolorum eos voluptatibus quos, doloribus molestiae ad quasi odit et.'
  const relatedBooks: IMockBook[] = getValidArray(mockBooks)

  return (
    <Stack pl={200} pr={200} pt={8} pb={8}>
      {/* Book Info */}
      <HStack spacing={32} alignItems={'flex-start'}>
        {/* Book Images */}
        <Box boxSize="540" shadow="sm" border="1px" borderColor="gray.200" borderRadius="4px">
          <Image boxSize="540" objectFit={'contain'} src={bookImages} alt={title} />
        </Box>
        {/* Book info */}
        <Stack justifySelf={'flex-start'} spacing={'16'}>
          <Stack>
            <Text fontSize={'2xl'}>{title}</Text>
            <Text fontSize={'xl'} color={'teal.800'}>
              {price} VND / {bonusPointPrice} Points
            </Text>
            <Text fontSize={'xl'} color={'teal.800'}>
              Rental status: {bookStatus}, until
            </Text>
          </Stack>
          <TableContainer>
            <Table variant="striped" colorScheme="teal" size={'sm'}>
              <Tbody>
                <Tr>
                  <Td minWidth={120}>Author</Td>
                  <Td minWidth={280}>{author}</Td>
                </Tr>
                <Tr>
                  <Td minWidth={120}>Cover</Td>
                  <Td minWidth={280}>{formatText(cover)}</Td>
                </Tr>
                <Tr>
                  <Td minWidth={120}>Publisher</Td>
                  <Td minWidth={280}>{formatText(publisher)}</Td>
                </Tr>
                <Tr>
                  <Td minWidth={120}>Language</Td>
                  <Td minWidth={280}>{formatText(language)}</Td>
                </Tr>
                <Tr>
                  <Td minWidth={120}>Condition</Td>
                  <Td minWidth={280}>{formatText(condition)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button
            size={'lg'}
            // onClick={onOpen}
            variant={bookStatus == 'available' ? 'solid' : 'flushed'}
            isDisabled={bookStatus == 'available' ? false : true}
          >
            {bookStatus == 'available' ? 'Add to cart' : 'Unavailable'}
          </Button>
        </Stack>
      </HStack>
      <Stack mt={4}>
        <Text fontSize={'xl'}>Description</Text>
        <Paragraph text={bookDescription} />
      </Stack>
      <Divider mt={4} />
      {/* Related Books */}
      <Center>
        <Text p={4} color={textGrey500}>
          RELATED BOOKS
        </Text>
      </Center>
      <BookListNoFilter books={[...relatedBooks]} pageSize={12} listLength={relatedBooks.length} />
    </Stack>
  )
}

export default BookDetail
