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
import { maxTabletWidth, textGrey500 } from 'theme/globalStyles'
import { formatText, getQueryValue, getValidArray, removeItem } from 'utils/common'
import Paragraph from './FadedParagraph'
import { useStores } from 'hooks/useStores'
import { handleError } from 'API/error'
import { get, includes } from 'lodash'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import ErrorNotFoundPage from 'pages/404'
import { IFilter, PredicateComparison } from 'types/query'
import { IBook, IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

const BookDetail = () => {
  const { websiteBookStore, spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const { bookDetail, websiteBookList } = websiteBookStore
  const router = useRouter()
  const bookId: string = String(get(router, 'query.id', ''))
  const [pageSize, setPageSize] = useState<number>(Number(router.query.pageSize) || 10)
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const [sort, setSort] = useState('updatedAt')
  const [orderBy, setOrderBy] = useState(-1)
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })

  const {
    title,
    author,
    price,
    bonusPointPrice,
    bookStatus,
    series,
    publisher,
    language,
    media,
    description,
    categories,
    bookCondition,
    bookCover
  } = bookDetail

  var relatedBooks: IBook[] = websiteBookList.results.filter((book) => book.id !== bookId)

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    spinnerStore.showLoading()
    try {
      await websiteBookStore.fetchWebsiteBookDetail(bookId)
      if (bookDetail) {
        const filter: IFilter<IBookWithRelations> = {
          where: {
            or: [
              {
                categories: {
                  inq: categories
                } as PredicateComparison<ICategory[]>
              },
              {
                series: {
                  inq: [series]
                }
              },
              {
                author: {
                  eq: author
                }
              }
            ]
          },
          offset: isReset ? 0 : pageSize * (page - 1),
          order: [`${sort} ${orderBy === 1 ? 'ASC' : 'DESC'}`],
          limit: pageSize,
          include: ['media']
        }
        await websiteBookStore.fetchWebsiteBookList(filter)
      }
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

  if (bookDetail) {
    if (isTabletMobile) {
      return (
        <Stack paddingLeft={20} paddingRight={20} pt={8} pb={8}>
          {/* Book Info */}
          <Stack spacing={32} alignItems={'flex-start'}>
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
          </Stack>
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
          <BookListNoFilter
            bookList={[...websiteBookList.results]}
            countBookList={websiteBookList.totalCount}
            gridColumns={4}
          />
        </Stack>
      )
    }
    return (
      <Stack paddingLeft={200} paddingRight={200} pt={8} pb={8}>
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
        <BookListNoFilter
          bookList={[...websiteBookList.results]}
          countBookList={websiteBookList.totalCount}
          gridColumns={4}
        />
      </Stack>
    )
  } else {
    return <ErrorNotFoundPage></ErrorNotFoundPage>
  }
}

export default observer(BookDetail)
