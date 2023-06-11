/* eslint-disable max-lines */
import {
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { handleError } from 'API/error'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from 'enums/book'
import { useStores } from 'hooks/useStores'
import capitalize from 'lodash/capitalize'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { createElement, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'
import CustomDatePicker from './components/CustomDatepicker'
import { IRoomForm } from './constants'

const AddNewBook = () => {
  const methods = useForm()
  const router = useRouter()
  const { spinnerStore, cmsSeriesStore } = useStores()
  const {isLoading} = spinnerStore
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
    reset,
    setValue
  } = methods
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const fromDate = useWatch({ control, name: 'availableStartDate', defaultValue: new Date() })
  const toDate = useWatch({ control, name: 'availableEndDate', defaultValue: new Date() })
  const releaseDate = useWatch({ control, name: 'releaseDate', defaultValue: new Date() })
  const [isFurnished, setIsFurnished] = useState<boolean>(false)
  const isFormDirty = isDirty

  function closeModal(): void {
    setIsModalOpen(false)
  }
  function onCancel(): void {
    if (isDirty && !isSubmitSuccessful) {
      onConfirm()
    } else {
      redirect()
    }
  }
  function redirect(): void {
    router.push(
      `${routes.cms.bookManagement.value}?index=0&page=${router.query.page}&pageSize=${router.query.pageSize}`
    )
  }
  async function onSubmit(data: IRoomForm): Promise<void> {
    spinnerStore.showLoading()
    try {

      toast.success('Create book successfully!')
      redirect()
    } catch (error) {
      toast.error('Create book failed!')
      handleError(error as Error, 'components/pages/CMS/BookManagement/Book/AddNewBook', 'onSubmit')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function fetchData(): Promise<void> {
    spinnerStore.showLoading()
    try {
      await Promise.all([
        cmsSeriesStore.fetchCMSSeriesList()
      ])
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/BookManagement/Book/AddNewBook', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  useEffect(() => {
    reset({})
    fetchData()
  }, [])

  function toggleCheckBox() {
    setIsFurnished(!isFurnished)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack padding={6} paddingInline={{ base: 6, lg: 8 }} paddingStart={{ base: '27px' }} spacing="30px">
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="lg" fontWeight="600" color="gray.700" marginBottom={2}>
              Create new book
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
              <FormInput name="title" label="Title" placeholder='Enter Title' isRequired/>
              <FormInput name="series" label="Series" placeholder='Enter Series' />
              <FormInput name="author" label="Authors" placeholder='Enter Authors' isRequired/>
              <FormInput name="price" label="Price" placeholder='Enter Price' isRequired/>
              <FormInput name="bonusPointPrice" label="Bonus Point Price" placeholder='Enter Bonus Point Price'/>
              <SimpleGrid width="full">
                <FormInput name="availableStartDate" label="Available From">
                  <Controller
                    name="availableStartDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        selected={fromDate}
                        onChange={(date: [Date | null, Date | null]) => {
                          setValue('availableStartDate', date[0], { shouldDirty: true })
                          setValue('availableEndDate', date[1], { shouldDirty: true })
                        }}
                        startDate={fromDate}
                        endDate={toDate}
                        selectsRange
                        customInput={createElement(forwardRef(CustomDatePicker))}
                      />
                    )}
                  />
                </FormInput>
              </SimpleGrid>
              <FormInput name="bookCondition" label="Book Condition">
                <Controller
                  name="bookCondition"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup marginTop={2} {...field} defaultValue={EBookConditionEnum.NEW}>
                      <VStack spacing={2} alignItems="flex-start">
                        <Radio value={EBookConditionEnum.NEW} colorScheme="teal">
                          {capitalize(EBookConditionEnum.NEW)}
                        </Radio>
                        <Radio value={EBookConditionEnum.OLD} colorScheme="teal">
                        {capitalize(EBookConditionEnum.OLD)}
                        </Radio>
                        <Radio value={EBookConditionEnum.DAMAGED} colorScheme="teal">
                          {capitalize(EBookConditionEnum.DAMAGED)}
                        </Radio>
                        <Radio value={EBookConditionEnum.LOST} colorScheme="teal">
                        {capitalize(EBookConditionEnum.LOST)}
                        </Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
              </FormInput>
              <FormInput name="bookStatus" label="Book Status">
                <Controller
                  name="bookStatus"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup marginTop={2} {...field} defaultValue={EBookStatusEnum.AVAILABLE}>
                      <VStack spacing={2} alignItems="flex-start">
                        <Radio value={EBookStatusEnum.AVAILABLE} colorScheme="teal">
                          {capitalize(EBookStatusEnum.AVAILABLE)}
                        </Radio>
                        <Radio value={EBookStatusEnum.UNAVAILABLE} colorScheme="teal">
                        {capitalize(EBookStatusEnum.UNAVAILABLE)}
                        </Radio>
                        <Radio value={EBookStatusEnum.RENTED} colorScheme="teal">
                          {capitalize(EBookStatusEnum.RENTED)}
                        </Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
              </FormInput>
            </Grid>
            <Divider borderColor="gray.200" borderBottomWidth="2px" />
            <Grid
              gap={{ base: 6, lg: 8 }}
              alignItems="flex-start"
              templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              width="full"
            >
              <FormInput name="publisher" label="Publisher" placeholder='Enter Publisher' isRequired/>
              <FormInput name="series" label="Languages" placeholder='Enter Languages' />
              <GridItem colSpan={{md: 2, lg: 1}} width="full">
                <FormInput name="releaseDate" label="Available From">
                  <Controller
                    name="releaseDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        selected={releaseDate}
                        onChange={(date: Date | null) => {
                          setValue('releaseDate', date, { shouldDirty: true })
                        }}
                        value={releaseDate}
                        customInput={createElement(forwardRef(CustomDatePicker))}
                      />
                    )}
                  />
                </FormInput>
              </GridItem>
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
            </Grid>
            <Divider borderColor="gray.200" borderBottomWidth="2px" />
            <Grid
              gap={{ base: 6, lg: 8 }}
              alignItems="flex-start"
              templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              width="full"
            >
              <FormInput name="bookCover" label="Book Cover">
                <Controller
                  name="bookCover"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup marginTop={2} {...field} defaultValue={EBookStatusEnum.AVAILABLE}>
                      <VStack spacing={2} alignItems="flex-start">
                        <Radio value={EBookCoverEnum.SOFT} colorScheme="teal">
                          {capitalize(EBookCoverEnum.SOFT)}
                        </Radio>
                        <Radio value={EBookCoverEnum.HARD} colorScheme="teal">
                        {capitalize(EBookCoverEnum.HARD)}
                        </Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
              </FormInput>
              <FormInput name="isbn" label="ISBN" placeholder='Enter ISBN' isRequired/>
            </Grid>
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

export default observer(AddNewBook) 
