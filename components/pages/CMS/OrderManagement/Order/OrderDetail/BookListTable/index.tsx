import { Box, HStack, Image, Link, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { updateOrderById } from 'API/cms/order'
import ConfirmModal from 'components/ConfirmModal'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import router from 'next/router'
import { ReactNode, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import routes from 'routes'
import { maxTabletWidth } from 'theme/globalStyles'
import { getValidArray } from 'utils/common'
import { getHeaderList } from '../../../../BookManagement/Book/BookList/constant'
import { IBookListTable } from './type'

const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'
const confirmModalContent: ReactNode = <Text>Are you sure to delete this Book?{<br />}This action can not be undo</Text>

const BookListTable = (props: IBookListTable) => {
  const { books } = props
  const [targetId, setTargetId] = useState<string>()
  const isNotDesktop: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const orderId: string = String(get(router, 'query.orderId', ''))

  async function removeBookFromOrder(): Promise<void> {
    try {
      if (targetId) {
        const formattedData = {
          bookList: books?.filter((book) => book?.id !== targetId)
        }
        await updateOrderById(orderId, formattedData)
        toast.success('Update order Successfully')
        router.push(routes.cms.orderManagement.order.value(orderId))
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  const dataInTable = getValidArray<IBookWithRelations>(books).map((book) => {
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
  return (
    <VStack spacing={4} width="full">
      <Text lineHeight="24px" fontSize="16" fontWeight="600" color="gray.700" alignSelf="flex-start">
        Book List
      </Text>
      <Box width="stretch" border="1px" borderColor="gray.200" borderRadius="12px">
        <Table
          headerList={getHeaderList(isNotDesktop)}
          tableData={dataInTable}
          isSmallSize
          subComponent={getSubComponent(getHeaderList(false), 3)}
        />
      </Box>
      <ConfirmModal
        titleText="Remove Book From Order"
        bodyText={confirmModalContent}
        cancelButtonText="No, keep this book"
        confirmButtonText="Yes, remove"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={removeBookFromOrder}
      />
    </VStack>
  )
}

export default observer(BookListTable)
