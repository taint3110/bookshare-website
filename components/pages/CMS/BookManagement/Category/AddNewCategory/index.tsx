/* eslint-disable max-lines */
import { Button, Grid, GridItem, HStack, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import { createNewCategory } from 'API/cms/category'
import { uploadMedia } from 'API/cms/media'
import { handleError } from 'API/error'
import ConfirmModal from 'components/ConfirmModal'
import FormInput from 'components/FormInput'
import { useStores } from 'hooks/useStores'
import { ICategory } from 'interfaces/category'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import MediaImage from '../../Book/BookDetail/components/MediaImage'
import { redirect } from './utils'

const AddNewCategory = () => {
  const methods = useForm({
    mode: 'onChange'
  })
  const { spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    control,
    reset
  } = methods
  const { isOpen: isConfirming, onOpen: onConfirm, onClose: closeConfirm } = useDisclosure()
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

  async function onSubmit(data: ICategory): Promise<void> {
    spinnerStore.showLoading()
    try {
      const formattedData = {
        name: data?.name || '',
        description: data?.description || ''
      }
      const newCategory: ICategory = await createNewCategory(formattedData)
      if (data?.formMedia && newCategory?.id) {
        await uploadMedia({
          fileName: data?.formMedia,
          imageUrl: data?.formMedia,
          categoryId: newCategory?.id
        })
      }
      toast.success('Create category successfully!')
      redirect()
    } catch (error) {
      toast.error('Create category failed!')
      handleError(error as Error, 'components/pages/CMS/BookManagement/Category/AddNewCategory', 'onSubmit')
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
              Create new category
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
              <FormInput name="name" label="Name" placeholder="Enter Name" />
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
            <MediaImage
              media={media}
              formLabel="Category Image"
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

export default observer(AddNewCategory)
