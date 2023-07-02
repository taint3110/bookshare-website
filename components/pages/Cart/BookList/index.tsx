import { useRouter } from 'next/router'
import { getHeaderList } from './constant'
import { getQueryValue, getValidArray } from 'utils/common'
import { useDisclosure, Text, Image, HStack, Link } from '@chakra-ui/react'
import { deleteBookById } from 'API/cms/book'
import { handleError } from 'API/error'
import getSubComponent from 'components/HOCs/getSubComponent'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import { useState, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import routes from 'routes'
import { maxTabletWidth } from 'theme/globalStyles'
import { ICategory } from 'interfaces/category'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { IMockBook, mockBooks } from 'components/BookList/components/BookCard/mockData'

const CartBookList = () => {
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
  const dataInTable = getValidArray(mockBooks).map((book: IMockBook) => {
    function handleDelete(): void {
      onConfirm()
      setTargetId(book?._id ?? '')
    }
    return {
      ...book,
      image: book?.imageUrl ? (
        <Image
          objectFit="cover"
          borderRadius="6px"
          marginLeft={1}
          src={book?.imageUrl}
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
      author: book?.author ?? 'Lol',
      price: book?.price ?? 100000,
      actions: (
        <HStack width="62px" cursor="pointer" marginLeft="auto">
          <Icon iconName="trash.svg" size={32} onClick={handleDelete} />
        </HStack>
      )
    }
  })
  return (
    <>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        pagination={pagination}
        pageSize={pageSize}
        isManualSort
        setPageSize={setPageSize}
        setSort={setSort}
        setOrderBy={setOrderBy}
        subComponent={getSubComponent(getHeaderList(), 3)}
      />
    </>
  )
}

export default CartBookList
