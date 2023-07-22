import { Card, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import ConfirmModal from 'components/ConfirmModal'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { EBookStatusEnum } from 'enums/book'
import { EOrderStatusEnum } from 'enums/order'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { IOrder } from 'interfaces/order'
import { observer } from 'mobx-react'
import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'
import { getHeaderList } from './constant'
import { updateOrderById } from 'API/cms/order'

export interface ICartBookListProps {
  order: IOrder
}

const CartBookList = (props: ICartBookListProps) => {
  const { order } = props
  const { websiteOrderStore } = useStores()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const [targetId, setTargetId] = useState<string>()
  const confirmModalContent: ReactNode = <Text>Are you sure to remove this Book?</Text>
  const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'
  const [orderStatus, setOrderStatus] = useState<EOrderStatusEnum>(order?.orderStatus ?? EOrderStatusEnum.NEW)

  async function deleteBook(): Promise<void> {
    try {
      if (targetId) {
        // TODO: Handle remove book from cart
        closeConfirm()
        await websiteOrderStore.updateOrder({
          ...order,
          bookList: getValidArray(order?.bookList).map((book: IBookWithRelations) => {
            if (book?.id === targetId) {
              return { ...book, bookStatus: EBookStatusEnum.AVAILABLE, orderId: '' }
            }
            return book
          })
        })
        toast.success('Remove Book Successfully')
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  const dataInTable = getValidArray(order.bookList).map((book: IBookWithRelations) => {
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
    <Card>
      <Table
        headerList={getHeaderList(orderStatus === EOrderStatusEnum.NEW)}
        tableData={dataInTable}
        isManualSort
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

export default observer(CartBookList)
