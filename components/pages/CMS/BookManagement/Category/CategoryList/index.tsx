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
import { deleteCategoryById } from 'API/cms/category'
import { handleError } from 'API/error'
import ButtonWithIcon from 'components/ButtonWithIcon'
import ConfirmModal from 'components/ConfirmModal'
import getSubComponent from 'components/HOCs/getSubComponent'
import Icon from 'components/Icon'
import Table from 'components/Table'
import { useStores } from 'hooks/useStores'
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
import { goToCategoryAddNewPage } from './utils'

const CategoryList = () => {
  const router = useRouter()
  const pageIndex: number = getQueryValue(router, 'page', 1)
  const { cmsCategoryStore, spinnerStore } = useStores()
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const isNotDesktop: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const { cmsCategoryList } = cmsCategoryStore
  const { results: categoryList, totalCount: tableLength } = cmsCategoryList
  const [pageSize, setPageSize] = useState<number>(Number(router.query.pageSize) || 10)
  const [sort, setSort] = useState('updatedAt')
  const [orderBy, setOrderBy] = useState(-1)
  const [title, setTitle] = useState<string>('')
  const [targetId, setTargetId] = useState<string>()
  const confirmModalContent: ReactNode = (
    <Text>Are you sure to delete this category?{<br />}This action can not be undo</Text>
  )
  const mockImage = 'https://www.animenewsnetwork.com/images/encyc/A21401-991568125.1544081652.jpg'

  async function fetchData(isReset: boolean = false, page: number = pageIndex): Promise<void> {
    try {
      spinnerStore.showLoading()
      const filter = {
        where: {
          name: { like: `${title}`, options: 'i' }
        },
        offset: isReset ? 0 : pageSize * (page - 1),
        order: [`${sort} ${orderBy === 1 ? 'ASC' : 'DESC'}`],
        limit: pageSize,
        include: ['media']
      }
      await cmsCategoryStore.fetchCMSCategoryList(filter)
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/BookManagement/Category/CategoryList', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function deleteCategory(): Promise<void> {
    try {
      if (targetId) {
        await deleteCategoryById(targetId)
        closeConfirm()
        fetchData()
        toast.success('Delete Category Successfully')
      }
    } catch (error) {
      toast.error('Something wrong happened')
    }
  }

  function gotoPage(page: number): void {
    router.push(`${routes.cms.bookManagement.value}?index=2&page=${page}&pageSize=${pageSize}`)
    fetchData(false, page)
  }

  const pagination = { pageIndex, tableLength, gotoPage }
  const dataInTable = getValidArray(categoryList).map((category: ICategory) => {
    const detailUrl: string = `${routes.cms.bookManagement.category.value(category?.id ?? '')}`
    function goToDetail() {
      router.push(
        {
          pathname: `${routes.cms.bookManagement.category.value(category?.id ?? '')}`,
          query: {
            page: pagination.pageIndex,
            pageSize
          }
        },
        `${routes.cms.bookManagement.category.value(category?.id ?? '')}`
      )
    }

    function handleDelete(): void {
      onConfirm()
      setTargetId(category?.id ?? '')
    }

    return {
      ...category,
      image: category?.media ? (
        <Image
          objectFit="cover"
          borderRadius="6px"
          marginLeft={1}
          src={category?.media?.imageUrl ?? mockImage}
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
      name: category?.name ?? '',
      description: category?.description ?? '',
      actions: (
        <HStack width="62px" cursor="pointer" marginLeft="auto">
          <Link href={detailUrl} marginTop="5px">
            <Icon iconName="edit.svg" size={32} onClick={goToDetail} />
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
    router.replace(`${routes.cms.bookManagement.value}?index=2&page=1`)
    fetchData(true)
  }, [pageSize, title, sort, orderBy])

  return (
    <Box paddingBottom={{ base: 4, lg: 2 }}>
      <HStack spacing={4} marginBottom={6}>
        <InputGroup borderRadius="6px" maxWidth={{ base: '300px', lg: '540px' }} background="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.400" />
          </InputLeftElement>
          <Input type="search" placeholder="Search category by Title" onChange={changeName} />
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
            onClick={goToCategoryAddNewPage}
          >
            + Add Category
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
        titleText="Delete category"
        bodyText={confirmModalContent}
        cancelButtonText="No, keep this category"
        confirmButtonText="Yes, Delete"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={deleteCategory}
      />
    </Box>
  )
}

export default observer(CategoryList)
