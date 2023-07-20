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
import { createNewBook } from 'API/cms/book'
import { uploadMedia } from 'API/cms/media'
import { handleError } from 'API/error'
import ChakraInputDropdown from 'components/ChakraInputDropdown'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from 'enums/book'
import { EZIndexLayer } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import { IBook } from 'interfaces/book'
import capitalize from 'lodash/capitalize'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { createElement, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import MediaImage from '../BookDetail/components/MediaImage'
import CustomDatePicker from './components/CustomDatepicker'
import { getOptionsSelect, mapAuthor, redirect } from './utils'

const AddNewBook = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const router = useRouter()
  const { spinnerStore, cmsSeriesStore } = useStores()
  const { cmsSeriesList } = cmsSeriesStore
  const { isLoading } = spinnerStore
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
    reset,
    setValue
  } = methods
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
  const fromDate = useWatch({ control, name: 'availableStartDate', defaultValue: new Date() })
  const toDate = useWatch({ control, name: 'availableEndDate', defaultValue: new Date() })
  const releaseDate = useWatch({ control, name: 'releaseDate', defaultValue: new Date() })
  const media = useWatch({ control, name: 'formMedia', defaultValue: '' })
  const [currentMedia, setCurrentMedia] = useState<string>('')
  const isFormDirty: boolean = isDirty

  function onCancel(): void {
    if (isDirty && !isSubmitSuccessful) {
      onConfirm()
    } else {
      redirect()
    }
  }

  async function onSubmit(data: IBook): Promise<void> {
    spinnerStore.showLoading()
    try {
      const formattedData: IBook = {
        ...omit(data, 'formSeries', 'formMedia', 'media'),
        availableStartDate: fromDate,
        availableEndDate: toDate,
        releaseDate: releaseDate,
        bookCondition: data?.bookCondition ?? EBookConditionEnum.NEW,
        bookCover: data?.bookCover ?? EBookCoverEnum.SOFT,
        bookStatus: data?.bookStatus ?? EBookStatusEnum.AVAILABLE,
        author: mapAuthor(String(data?.author)),
        price: Number(data?.price),
        bonusPointPrice: Number(data?.bonusPointPrice),
        seriesId: String(data?.formSeries?.value ?? ''),
        updatedAt: new Date()
      }
      const newBook: IBook = await createNewBook(formattedData)
      if (data?.formMedia && newBook?.id) {
        await uploadMedia({
          fileName: data?.formMedia,
          imageUrl: data?.formMedia,
          bookId: newBook?.id
        })
      }
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
      await Promise.all([cmsSeriesStore.fetchCMSSeriesList()])
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack padding={6} paddingInline={{ base: 6, lg: 8 }} paddingStart={{ base: '27px' }}>
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
              <FormInput name="title" label="Title" placeholder="Enter Title" />
              <ChakraInputDropdown
                zIndex={EZIndexLayer.FILTER_BAR}
                name="formSeries"
                label="Series"
                optionsData={getOptionsSelect(cmsSeriesList)}
              />
              <FormInput name="author" label="Authors" placeholder="Enter Authors" />
              <FormInput name="price" type="number" label="Price" placeholder="Enter Price" />
              <FormInput
                name="bonusPointPrice"
                label="Bonus Point Price"
                placeholder="Enter Bonus Point Price"
                isRequired={false}
                type="number"
              />
              <SimpleGrid width="full">
                <FormInput name="availableStartDate" label="Available From">
                  <Controller
                    name="availableStartDate"
                    control={control}
                    rules={{ required: false }}
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
                  rules={{ required: false }}
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
                  rules={{ required: false }}
                  render={({ field }) => (
                    <RadioGroup marginTop={2} {...field} defaultValue={EBookStatusEnum.AVAILABLE}>
                      <VStack spacing={2} alignItems="flex-start">
                        <Radio value={EBookStatusEnum.AVAILABLE} colorScheme="teal">
                          {capitalize(EBookStatusEnum.AVAILABLE)}
                        </Radio>
                        <Radio value={EBookStatusEnum.UNAVAILABLE} colorScheme="teal">
                          {capitalize(EBookStatusEnum.UNAVAILABLE)}
                        </Radio>
                        <Radio value={EBookStatusEnum.ORDERED} colorScheme="teal">
                          {capitalize(EBookStatusEnum.ORDERED)}
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
              <FormInput name="publisher" label="Publisher" placeholder="Enter Publisher" isRequired={false} />
              <FormInput name="language" label="Language" placeholder="Enter Languages" isRequired={false} />
              <GridItem colSpan={{ md: 2, lg: 1 }} width="full">
                <FormInput name="releaseDate" label="Release Date">
                  <Controller
                    name="releaseDate"
                    control={control}
                    rules={{ required: false }}
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
                  rules={{ required: false }}
                  render={({ field }) => (
                    <RadioGroup marginTop={2} {...field} defaultValue={EBookCoverEnum.SOFT}>
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
              <FormInput name="isbn" label="ISBN" placeholder="Enter ISBN" isRequired={false} />
            </Grid>
            <MediaImage
              media={media}
              formLabel="Book Image"
              currentFile={currentMedia}
              setCurrentFile={setCurrentMedia}
            />
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
