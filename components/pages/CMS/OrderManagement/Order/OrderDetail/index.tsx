/* eslint-disable max-lines */
import { Button, Divider, Grid, GridItem, HStack, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import { updateOrderById } from 'API/cms/order'
import { handleError } from 'API/error'
import ChakraInputDropdown from 'components/ChakraInputDropdown'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { EOrderStatusEnum } from 'enums/order'
import { EZIndexLayer } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import { IOrder } from 'interfaces/order'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'
import BookListTable from './BookListTable'
import { getOptionsSelect, getRentLengthOptionsSelect, redirect } from './utils'

const OrderDetail = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const { spinnerStore, cmsOrderStore } = useStores()
  const { isLoading } = spinnerStore
  const router = useRouter()
  const { orderDetail } = cmsOrderStore
  const orderId: string = String(get(router, 'query.orderId', ''))
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
    reset,
    setValue
  } = methods
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const releaseDate = useWatch({ control, name: 'releaseDate', defaultValue: new Date() })
  const media = useWatch({ control, name: 'formMedia', defaultValue: '' })
  const [currentMedia, setCurrentMedia] = useState<string>('')
  const isFormDirty = isDirty

  function onCancel(): void {
    if (isDirty && !isSubmitSuccessful) {
      onConfirm()
    } else {
      redirect()
    }
  }

  async function onSubmit(data: IOrder): Promise<void> {
    spinnerStore.showLoading()
    try {
      const formattedData: IOrder = {
        ...omit(data, 'bookList', 'formUserName', 'formStatus', 'formRentLength', 'totalPrice'),
        rentLength: Number(data?.formRentLength?.value),
        description: data?.description ?? '',
        orderStatus: data?.formStatus?.value as EOrderStatusEnum
      }
      await updateOrderById(orderId, formattedData)
      toast.success('Update order successfully!')
      redirect()
    } catch (error) {
      toast.error('Update order failed!')
      handleError(error as Error, 'components/pages/CMS/OrderManagement/Order/OrderDetail', 'onSubmit')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function fetchData(): Promise<void> {
    spinnerStore.showLoading()
    try {
      await cmsOrderStore.fetchCMSOrderDetail(orderId, {
        include: ['book']
      })
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/OrderManagement/Order/OrderDetail', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  useEffect(() => {
    if (orderId) {
      reset({})
      fetchData()
    }
  }, [orderId])

  useEffect(() => {
    if (orderDetail?.id) {
      const orderFormValue: IOrder = {
        ...orderDetail,
        formUserName: 'Admin',
        formStatus: {
          label: capitalize(orderDetail?.orderStatus),
          value: orderDetail?.orderStatus ?? ''
        },
        formRentLength: {
          label: `${orderDetail?.rentLength} ${orderDetail?.rentLength ?? 1 > 1 ? 'months' : 'month'}`,
          value: String(orderDetail?.rentLength) ?? ''
        }
      }
      reset(orderFormValue)
    }
  }, [orderDetail])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack padding={6} paddingInline={{ base: 6, lg: 8 }} paddingStart={{ base: '27px' }}>
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="lg" fontWeight="600" color="gray.700" marginBottom={2}>
              Update order
            </Text>
            <HStack spacing={4}>
              <Button
                color="gray.700"
                background="white"
                border="1px solid #E2E8F0"
                isLoading={isSubmitting || isLoading}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting || isLoading}
                disabled={!isFormDirty}
              >
                Save
              </Button>
            </HStack>
          </HStack>
          <VStack
            marginTop="24px !important"
            background="white"
            padding={{ base: 6, lg: 8 }}
            spacing={{ base: 6, lg: 8 }}
            borderRadius="8px"
            width="full"
          >
            <Grid
              gap={{ base: 6, lg: 8 }}
              alignItems="flex-start"
              templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              width="full"
            >
              <FormInput name="formUserName" label="User" disabled />
              <FormInput name="totalPrice" label="Total Price" disabled />
              <GridItem colSpan={{ base: 3, lg: 2 }}>
                <FormInput name="description" label="Description">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea {...field} placeholder="Enter description" color="gray.700" lineHeight={6} />
                    )}
                  />
                </FormInput>
              </GridItem>
              <ChakraInputDropdown
                zIndex={EZIndexLayer.FILTER_BAR}
                name="formStatus"
                label="Status"
                optionsData={getOptionsSelect()}
              />
              <ChakraInputDropdown
                zIndex={EZIndexLayer.FILTER_BAR}
                name="formRentLength"
                label="Rent Length"
                optionsData={getRentLengthOptionsSelect()}
              />
            </Grid>
            <Divider borderColor="gray.200" borderBottomWidth="2px" />
            <BookListTable books={getValidArray(orderDetail?.bookList)} />
          </VStack>
        </VStack>
      </form>
      <ConfirmModal
        titleText="Discard Changes?"
        bodyText="Your changes have not been saved. Are you sure to discard changes?"
        cancelButtonText="No, keep editing"
        isOpen={isConfirming}
        onClose={closeConfirm}
        onClickAccept={redirect}
      />
    </FormProvider>
  )
}

export default observer(OrderDetail)
