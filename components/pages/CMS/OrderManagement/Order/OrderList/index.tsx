import { Search2Icon } from '@chakra-ui/icons'
import { Box, HStack, Input, InputGroup, InputLeftElement, Link, Text, useDisclosure } from '@chakra-ui/react'
import { deleteOrderById } from 'API/cms/order'
import { handleError } from 'API/error'
import ButtonWithIcon from 'components/ButtonWithIcon'
import ConfirmModal from 'components/ConfirmModal'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import dayjs from 'dayjs'
import { useStores } from 'hooks/useStores'
import { IOrder } from 'interfaces/order'
import capitalize from 'lodash/capitalize'
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

const OrderList = () => {
  const router = useRouter()
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const { cmsOrderStore, spinnerStore } = useStores()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const isNotDesktop: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const { cmsOrderList } = cmsOrderStore
  const { results: orderList, totalCount: tableLength } = cmsOrderList
  const [pageSize, setPageSize] = useState<number>(Number(router.query.pageSize) || 10)
  const [sort, setSort] = useState('updatedAt')
  const [orderBy, setOrderBy] = useState(-1)
  const [title, setTitle] = useState<string>('')
  const [targetId, setTargetId] = useState<string>()
  const confirmModalContent: ReactNode = (
    <Text>Are you sure to delete this Order?{<br />}This action can not be undo</Text>
  )
  const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    try {
      spinnerStore.showLoading()
      const filter = {
        offset: isReset ? 0 : pageSize * (page - 1),
        order: [`${sort} ${orderBy === 1 ? 'ASC' : 'DESC'}`],
        limit: pageSize
      }
      await cmsOrderStore.fetchCMSOrderList(filter)
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/OrderManagement/OrderList', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function deleteBook(): Promise<void> {
    try {
      if (targetId) {
        await deleteOrderById(targetId)
        closeConfirm()
        fetchData()
        toast.success('Delete Book Successfully')
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  function gotoPage(page: number): void {
    router.push(`${routes.cms.orderManagement.value}?index=0&page=${page}&pageSize=${pageSize}`)
    fetchData(false, page)
  }
  const pagination = { pageIndex, tableLength, gotoPage }
  const dataInTable = getValidArray(orderList).map((order: IOrder) => {
    const detailUrl: string = `${routes.cms.orderManagement.order.value(order?.id ?? '')}`

    function handleDelete(): void {
      onConfirm()
      setTargetId(order?.id ?? '')
    }

    return {
      ...order,
      fullName: 'Admin',
      orderStatus: capitalize(order?.orderStatus),
      totalPrice: order?.totalPrice ?? 0,
      rentLength: order?.rentLength ?? 0,
      createdAt: dayjs(order?.createdAt).format('DD/MM/YYYY'),
      updatedAt: dayjs(order?.updatedAt).format('DD/MM/YYYY'),
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
    router.replace(`${routes.cms.orderManagement.value}?index=0&page=1`)
    fetchData(true)
  }, [pageSize, title, sort, orderBy])

  return (
    <Box paddingBottom={{ base: 4, lg: 2 }}>
      <HStack spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth={{ base: '300px', lg: '540px' }} background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input type="search" placeholder="Search order by Title" onChange={changeName} />
        </InputGroup>
        <Box borderRadius="6px" bg="white">
          <ButtonWithIcon label="Filter" iconName="filter.svg" size={16} border="1px solid #E2E8F0" color="gray.800" />
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
        cancelButtonText="No, keep this order"
        confirmButtonText="Yes, Delete"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={deleteBook}
      />
    </Box>
  )
}

export default observer(OrderList)
