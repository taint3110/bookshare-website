import { useRouter } from 'next/router'
import { getHeaderList } from './constant'
import { getQueryValue, getValidArray } from 'utils/common'
import { useDisclosure, Text, Image, HStack, Link, Card } from '@chakra-ui/react'
import { deleteBookById } from 'API/cms/book'
import { handleError } from 'API/error'
import getSubComponent from 'components/HOCs/getSubComponent'
import { useStores } from 'hooks/useStores'
import { useState, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import routes from 'routes'
import { maxTabletWidth } from 'theme/globalStyles'
import { ICategory } from 'interfaces/category'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { IMockBook, mockBooks, mockOrder } from 'components/BookList/components/BookCard/mockData'
import ConfirmModal from 'components/ConfirmModal'

const CartBookList = () => {
  const router = useRouter()
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const { spinnerStore } = useStores()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const [sort, setSort] = useState('updatedAt')
  const [orderBy, setOrderBy] = useState(-1)
  const [targetId, setTargetId] = useState<string>()
  const confirmModalContent: ReactNode = <Text>Are you sure to remove this Book?</Text>
  const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    try {
    } catch (error) {
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function deleteBook(): Promise<void> {
    try {
      if (targetId) {
        // TODO: Handle remove book from cart
        closeConfirm()
        fetchData()
        toast.success('Remove Book Successfully')
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  const dataInTable = getValidArray(mockOrder.bookList).map((book: IMockBook) => {
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
    <Card flexGrow={2}>
      <Table
        headerList={getHeaderList()}
        tableData={dataInTable}
        isManualSort
        setSort={setSort}
        setOrderBy={setOrderBy}
        subComponent={getSubComponent(getHeaderList(), 3)}
      />
      <ConfirmModal
        titleText="Remove Book"
        bodyText={confirmModalContent}
        cancelButtonText="No, keep this book"
        confirmButtonText="Yes, please"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={deleteBook}
      />
    </Card>
  )
}

export default CartBookList
