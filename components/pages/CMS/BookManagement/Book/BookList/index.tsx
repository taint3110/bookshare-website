import { Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { deleteBookById } from 'API/cms/book'
import { handleError } from 'API/error'
import ButtonWithIcon from 'components/ButtonWithIcon'
import ConfirmModal from 'components/ConfirmModal'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import routes from 'routes'
import { maxTabletWidth } from 'theme/globalStyles'
import { getQueryValue, getValidArray } from 'utils/common'
import { getHeaderList } from './constant'
import { goToBookAddNewPage } from './utils'

const BookList = () => {
  const router = useRouter()
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const { cmsBookStore, spinnerStore } = useStores()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const isNotDesktop: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const { cmsBookList } = cmsBookStore
  const { results: bookList, totalCount: tableLength } = cmsBookList
  const [pageSize, setPageSize] = useState<number>(Number(router.query.pageSize) || 10)
  const [sort, setSort] = useState('updatedAt')
  const [orderBy, setOrderBy] = useState(-1)
  const [title, setTitle] = useState<string>('')
  const [targetId, setTargetId] = useState<string>()
  const confirmModalContent: ReactNode = (
    <Text>Are you sure to delete this Book?{<br />}This action can not be undo</Text>
  )
  const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    try {
      spinnerStore.showLoading()
      const filter = {
        where: {
          title
        },
        offset: isReset ? 0 : pageSize * (page - 1),
        order: [`${sort} ${orderBy === 1 ? 'ASC' : 'DESC'}`],
        limit: pageSize
      }
      await cmsBookStore.fetchCMSBookList(filter)
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/BookManagement/BookList', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function deleteBook(): Promise<void> {
    try {
      if (targetId) {
        await deleteBookById(targetId)
        closeConfirm()
        fetchData()
        toast.success('Delete Book Successfully')
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  function gotoPage(page: number): void {
    router.push(`${routes.cms.bookManagement.value}?index=0&page=${page}&pageSize=${pageSize}`)
    fetchData(false, page)
  }
  const pagination = { pageIndex, tableLength, gotoPage }
  const dataInTable = getValidArray(bookList).map((book: IBookWithRelations) => {
    const detailUrl: string = `${routes.cms.bookManagement.book.value(book?.id ?? '')}`

    function handleDelete(): void {
      onConfirm()
      setTargetId(book?.id ?? '')
    }

    return {
      ...book,
      image: book?.media ? (
        <Image
          objectFit="cover"
          borderRadius="6px"
          marginLeft={1}
          src={book?.media?.imageUrl}
          alt="imageUrl"
          width={8}
          height={8}
        />
      ) : (
        <Image
          objectFit="cover"
          marginLeft={1}
          alignSelf="center"
          borderRadius="6px"
          src={mockImage}
          alt="imageUrl"
          width={8}
          height={8}
        />
      ),
      title: book?.title ?? 'Kaguya',
      categories: getValidArray(book?.categories)
        .map((category: ICategory) => category?.name)
        .join(', '),
      series: book?.series?.title ?? '',
      price: book?.price ?? 100000,
      status: 'Available',
      actions: (
        <HStack width="62px" cursor="pointer" marginLeft="auto">
          <Link href={detailUrl} marginTop="5px">
            <Icon iconName="edit.svg" size={32} />
          </Link>
          <Icon iconName="trash.svg" size={32} onClick={handleDelete} />
        </HStack>
      )
    }
  })

  const changeName = useCallback(
    debounce((event: { target: { value: string } }) => {
      setTitle(event?.target?.value ?? '')
    }, 1000),
    []
  )

  useEffect(() => {
    router.replace(`${routes.cms.bookManagement.value}?index=0&page=1`)
    fetchData(true)
  }, [pageSize, title, sort, orderBy])

  return (
    <Box paddingBottom={{ base: 4, lg: 2 }}>
      <HStack spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth={{ base: '300px', lg: '540px' }} background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input type="search" placeholder="Search book by Title" onChange={changeName} />
        </InputGroup>
        <Box borderRadius="6px" bg="white">
          <ButtonWithIcon label="Filter" iconName="filter.svg" size={16} border="1px solid #E2E8F0" color="gray.800" />
        </Box>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            padding="2"
            paddingInline="4"
            color="white"
            colorScheme="teal"
            lineHeight={6}
            onClick={goToBookAddNewPage}
          >
            + Add Book
          </Button>
        </Box>
      </HStack>
      <Table
        headerList={getHeaderList(isNotDesktop)}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        isManualSort
        setPageSize={setPageSize}
        setSort={setSort}
        setOrderBy={setOrderBy}
        subComponent={getSubComponent(getHeaderList(false), 3)}
      />
      <ConfirmModal
        titleText="Delete Book"
        bodyText={confirmModalContent}
        cancelButtonText="No, keep this book"
        confirmButtonText="Yes, Delete"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={deleteBook}
      />
    </Box>
  )
}

export default observer(BookList)
