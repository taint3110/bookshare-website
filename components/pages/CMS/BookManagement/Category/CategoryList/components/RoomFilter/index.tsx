import React, { useEffect, RefObject } from 'react'
import {
  Button,
  chakra,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { EZIndexLayer } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { roomFilterPrice } from 'components/pages/ListingPage/components/RoomFilter/constants'
import { IOption } from 'interfaces/common'
import { IQueryParams } from '../../types'
import RoomFilterForm from './FilterForm'
import { getHouseFilter, getPriceOptionByValue } from './FilterForm/utils'
import { Text, Container, ButtonApplyFilter } from './roomFilter.styles'

dayjs.extend(customParseFormat)

interface IRoomFilterProps {
  openModalFilter: boolean
  buttonRef?: RefObject<HTMLButtonElement>
  setQueryParams: (data: IQueryParams) => void
  setOpenModalFilter: (status: boolean) => void
  filterData: IQueryParams
}

export interface IFilterForm {
  house?: IOption
  price?: IOption
  availableDate?: string[]
  privateBathroom?: boolean
  sharedBathroom?: boolean
}

const RoomFilter = (props: IRoomFilterProps) => {
  const { openModalFilter, setOpenModalFilter, setQueryParams, filterData } = props
  const methods: UseFormReturn = useForm<IFilterForm>()
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods
  const initialFilterData: IQueryParams = {
    house: '',
    price: '',
    availableDate: [],
    privateBathroom: false,
    sharedBathroom: false
  }
  const { spinnerStore, cmsHouseStore } = useStores()
  const { cmsHouseList } = cmsHouseStore
  const { results: houseList } = cmsHouseList
  const { isLoading } = spinnerStore
  const buttonRef: RefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>(null)

  function onSubmit(data: IFilterForm): void {
    spinnerStore.showLoading()
    setOpenModalFilter(false)
    setQueryParams({
      ...data,
      house: data?.house?.value ?? '',
      price: data?.price?.value ?? ''
    })
  }

  function resetForm(): void {
    spinnerStore.showLoading()
    reset(initialFilterData)
    setQueryParams({})
  }

  function closeModal(): void {
    setOpenModalFilter(false)
  }

  useEffect(() => {
    if (openModalFilter) {
      //* INFO: Fetch all houses for house filter
      cmsHouseStore.fetchCMSHouseList()
      reset({
        house: filterData?.house ? getHouseFilter(filterData.house, houseList) : undefined,
        price: filterData?.price ? getPriceOptionByValue(filterData.price, roomFilterPrice) : undefined,
        availableDate: filterData?.availableDate ?? [],
        privateBathroom: filterData?.privateBathroom ?? '',
        sharedBathroom: filterData?.sharedBathroom ?? ''
      })
    }
  }, [openModalFilter])

  return (
    <Container>
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)} id="filter-form">
          <Drawer isOpen={openModalFilter} size="sm" placement="right" onClose={closeModal} finalFocusRef={buttonRef}>
            <DrawerOverlay />
            <DrawerContent zIndex={EZIndexLayer.MODAL}>
              <Flex flexDirection="column" height="stretch">
                <ModalHeader boxShadow="base" zIndex={EZIndexLayer.NAV}>
                  <Text>Filter</Text>
                </ModalHeader>
                <ModalCloseButton color="#000" onClick={closeModal} zIndex={EZIndexLayer.NAV} />
                <ModalBody flex="auto">
                  <RoomFilterForm houseList={houseList} />
                </ModalBody>
                <ModalFooter flex={1} placeItems="flex-end" marginBottom={4}>
                  <Button
                    background="white"
                    color="teal.500"
                    width="50%"
                    marginRight={4}
                    isLoading={isSubmitting || isLoading}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                  <ButtonApplyFilter type="submit" form="filter-form" isLoading={isSubmitting || isLoading}>
                    Apply filter
                  </ButtonApplyFilter>
                </ModalFooter>
              </Flex>
            </DrawerContent>
          </Drawer>
        </chakra.form>
      </FormProvider>
    </Container>
  )
}

export default observer(RoomFilter)
