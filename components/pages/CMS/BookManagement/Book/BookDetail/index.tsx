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
import { updateBookById } from 'API/cms/book'
import { uploadMedia } from 'API/cms/media'
import { handleError } from 'API/error'
import ChakraInputDropdown from 'components/ChakraInputDropdown'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { EBookConditionEnum, EBookCoverEnum, EBookStatusEnum } from 'enums/book'
import { EZIndexLayer } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import { IBookWithRelations } from 'interfaces/book'
import { IOption } from 'interfaces/common'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { createElement, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'
import CustomDatePicker from './components/CustomDatepicker'
import MediaImage from './components/MediaImage'
import SelectCategories from './components/SelectCategories'
import { getBookFormValues, getCategoriesOptionsSelect, getOptionsSelect, mapAuthor, redirect } from './utils'

const BookDetail = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const router = useRouter()
  const bookId: string = String(get(router, 'query.bookId', ''))
  const { spinnerStore, cmsSeriesStore, cmsBookStore, cmsCategoryStore } = useStores()
  const { cmsSeriesList } = cmsSeriesStore
  const { cmsCategoryList } = cmsCategoryStore

  const { bookDetail } = cmsBookStore
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
  const categories: IOption[] = useWatch({ control, name: 'categories', defaultValue: [] })
  const media = useWatch({ control, name: 'formMedia', defaultValue: '' })
  const [currentMedia, setCurrentMedia] = useState<string>('')
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const isFormDirty: boolean = isDirty
  function onCancel(): void {
    if (isDirty && !isSubmitSuccessful) {
      onConfirm()
    } else {
      redirect()
    }
  }

  async function onSubmit(data: IBookWithRelations): Promise<void> {
    spinnerStore.showLoading()
    try {
      const formattedData: IBookWithRelations = {
        ...omit(data, 'formSeries', 'formCategories', 'series', 'categories', 'formMedia', 'media'),
        availableStartDate: fromDate,
        availableEndDate: toDate,
        releaseDate: releaseDate,
        author: mapAuthor(String(data?.author)),
        price: Number(data?.price),
        bonusPointPrice: Number(data?.bonusPointPrice),
        seriesId: String(data?.formSeries?.value ?? ''),
        updatedAt: new Date()
      }
      if (data?.formMedia) {
        await uploadMedia({
          id: bookDetail?.media?._id ?? '',
          fileName: data?.formMedia,
          imageUrl: data?.formMedia,
          bookId
        })
      }
      await updateBookById(formattedData, checkedItems)
      toast.success('Update book successfully!')
      redirect()
    } catch (error) {
      toast.error('Update book failed!')
      handleError(error as Error, 'components/pages/CMS/BookManagement/Book/BookDetail', 'onSubmit')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  async function fetchData(): Promise<void> {
    spinnerStore.showLoading()
    try {
      await Promise.all([
        cmsBookStore.fetchCMSBookDetail(bookId),
        cmsSeriesStore.fetchCMSSeriesList(),
        cmsCategoryStore.fetchCMSCategoryList()
      ])
    } catch (error) {
      handleError(error as Error, 'components/pages/CMS/BookManagement/Book/BookDetail', 'fetchData')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  useEffect(() => {
    if (bookId) {
      reset({})
      fetchData()
    }
  }, [bookId])

  useEffect(() => {
    if (bookDetail?.id) {
      const bookFormValues: IBookWithRelations = getBookFormValues(bookDetail)
      setCheckedItems(getValidArray(bookFormValues?.formCategories).map((item: IOption) => item?.value))
      setCurrentMedia(get(bookDetail, 'media.imageUrl', ''))
      reset({ ...bookFormValues, categories: getCategoriesOptionsSelect(getValidArray(cmsCategoryList?.results)) })
    }
  }, [bookDetail])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack padding={6} paddingInline={{ base: 6, lg: 8 }} paddingStart={{ base: '27px' }}>
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="lg" fontWeight="600" color="gray.700" marginBottom={2}>
              Update Book Detail
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
              <GridItem>
                <SelectCategories
                  categories={categories}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              </GridItem>
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

export default observer(BookDetail)
