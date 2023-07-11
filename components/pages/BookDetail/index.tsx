import {
  Box,
  Stack,
  HStack,
  Image,
  Table,
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
import { useStores } from 'hooks/useStores'
import { handleError } from 'API/error'
import router from 'next/router'
import { get } from 'lodash'
import { useEffect } from 'react'

const BookDetail = () => {
  const { websiteBookStore, spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const { bookDetail } = websiteBookStore
  const bookId: string = String(get(router, 'query.id', ''))

  const {
    title,
    author,
    price,
    bonusPointPrice,
    bookStatus,
    publisher,
    language,
    media,
    description,
    categories,
    bookCondition,
    bookCover
  } = bookDetail

  const relatedBooks: IMockBook[] = getValidArray(mockBooks)

  async function fetchData(): Promise<void> {
    spinnerStore.showLoading()
    try {
      await Promise.all([websiteBookStore.fetchWebsiteBookDetail(bookId)])
    } catch (error) {
      handleError(error as Error, 'components/pages/BookDetail', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }
  useEffect(() => {
    if (bookId) {
      fetchData()
    }
  }, [bookId])

  return (
    <Stack pl={200} pr={200} pt={8} pb={8}>
      {/* Book Info */}
      <HStack spacing={32} alignItems={'flex-start'}>
        {/* Book Images */}
        <Box boxSize="540" shadow="sm" border="1px" borderColor="gray.200" borderRadius="4px">
          <Image boxSize="540" objectFit={'contain'} src={media?.imageUrl} alt={title} />
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
                  <Td minWidth={280}>{formatText(bookCover)}</Td>
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
                  <Td minWidth={280}>{formatText(bookCondition)}</Td>
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
      {description ? (
        <Stack mt={4}>
          <Text fontSize={'xl'}>Description</Text>
          <Paragraph text={description!} />
        </Stack>
      ) : (
        <></>
      )}
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
