import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr
} from '@chakra-ui/react'
import { handleError } from 'API/error'
import BookListNoFilter from 'components/BookListNoFilter'
import { useStores } from 'hooks/useStores'
import { IBook, IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { get } from 'lodash'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import ErrorNotFoundPage from 'pages/404'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { maxMobileWidth, maxTabletWidth, textGrey500 } from 'theme/globalStyles'
import { PredicateComparison } from 'types/query'
import { formatDate, formatText, getQueryValue, getValidArray } from 'utils/common'
import Paragraph from './FadedParagraph'
import { EBookConditionEnum, EBookStatusEnum } from 'enums/book'
import dayjs from 'dayjs'

const BookDetail = () => {
  const { websiteBookStore, spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const { bookDetail, websiteBookList, titleFilter } = websiteBookStore
  const router = useRouter()
  const bookId: string = String(get(router, 'query.id', ''))
  const [pageSize, setPageSize] = useState<number>(Number(router.query.pageSize) || 10)
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const [sort, setSort] = useState('bookStatus')
  const { query } = router
  const [orderBy, setOrderBy] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth })
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })

  useEffect(() => {
    setIsCollapsed(isMobile || isTabletMobile)
  }, [isMobile, isTabletMobile])

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
    availableStartDate,
    bookCondition,
    bookCover
  } = bookDetail

  function filterRelatedBooks(books: IBookWithRelations[]): IBookWithRelations[] {
    const relatedBooks: IBook[] = getValidArray(books).filter((book) => book.id !== bookId)
    if (Array.isArray(relatedBooks) && relatedBooks.length > 0) {
      return relatedBooks
    }
    return []
  }

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    spinnerStore.showLoading()
    try {
      await websiteBookStore.fetchWebsiteBookDetail(bookId)
      if (bookDetail) {
        const filter = {
          where: {
            title: titleFilter,
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
    console.log(titleFilter)
    if (bookId) {
      fetchData()
    }
  }, [bookId, titleFilter])

  if (bookDetail) {
    if (isCollapsed) {
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
            gridColumns={2}
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
                {bookStatus === EBookStatusEnum.AVAILABLE || !availableStartDate
                  ? `Rental status:  ${bookStatus}`
                  : `Rental status: ${bookStatus}, until ${dayjs(availableStartDate).format('MM/DD/YYYY')}`}
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
          bookList={[...filterRelatedBooks(websiteBookList?.results)]}
          countBookList={filterRelatedBooks(websiteBookList?.results)?.length}
          gridColumns={4}
        />
      </Stack>
    )
  } else {
    return <ErrorNotFoundPage></ErrorNotFoundPage>
  }
}

export default observer(BookDetail)
