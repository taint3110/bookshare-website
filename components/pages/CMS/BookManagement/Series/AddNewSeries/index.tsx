/* eslint-disable max-lines */
import { Button, Divider, Grid, GridItem, HStack, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import { uploadMedia } from 'API/cms/media'
import { createNewSeries } from 'API/cms/series'
import { handleError } from 'API/error'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ISeries } from 'interfaces/series'
import omit from 'lodash/omit'
import { observer } from 'mobx-react'
import { createElement, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import MediaImage from '../../Book/BookDetail/components/MediaImage'
import CustomDatePicker from './components/CustomDatepicker'
import { mapAuthor, redirect } from './utils'

const AddNewSeries = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const { spinnerStore } = useStores()
  const { isLoading } = spinnerStore
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

  async function onSubmit(data: ISeries): Promise<void> {
    spinnerStore.showLoading()
    try {
      const formattedData = {
        ...omit(data, 'series'),
        title: data?.title || '',
        author: mapAuthor(String(data?.author)),
        description: data?.description || '',
        releaseDate
      }
      const newSeries: ISeries = await createNewSeries(formattedData)
      if (data?.formMedia && newSeries?.id) {
        await uploadMedia({
          fileName: data?.formMedia,
          imageUrl: data?.formMedia,
          categoryId: newSeries?.id
        })
      }
      toast.success('Create series successfully!')
      redirect()
    } catch (error) {
      toast.error('Create series failed!')
      handleError(error as Error, 'components/pages/CMS/BookManagement/Series/AddNewSeries', 'onSubmit')
    } finally {
      spinnerStore.hideLoading()
    }
  }

  useEffect(() => {
    reset({})
  }, [])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack padding={6} paddingInline={{ base: 6, lg: 8 }} paddingStart={{ base: '27px' }}>
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="lg" fontWeight="600" color="gray.700" marginBottom={2}>
              Create new series
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
              <FormInput name="author" label="Authors" placeholder="Enter Authors" />
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
            </Grid>
            <Divider borderColor="gray.200" borderBottomWidth="2px" />
            <MediaImage
              media={media}
              formLabel="Series Image"
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

export default observer(AddNewSeries)
