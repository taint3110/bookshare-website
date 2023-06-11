import { cloneElement, Dispatch, SetStateAction, useEffect } from 'react'
import { Text, Stack, StackProps, HStack, FormControl, Button, VStack, FormErrorMessage } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import Icon from 'components/Icon'
import { IUser } from 'interfaces/user'

interface IFieldGroupProps extends Omit<StackProps, 'onSubmit'> {
  title: string
  id?: string
  children: React.ReactElement
  editComponent?: React.ReactNode
  editLabel?: string
  isInput?: boolean
  isEditable?: boolean
  handleTurnOnEditMode?: () => void
  handleTurnOffEditMode?: () => void
  isImage?: boolean
  isImageDirty?: boolean
  onSubmit?: (data: IUser) => Promise<void>
  keyPressed?: string
  editingField?: string
  setEditingField?: Dispatch<SetStateAction<string>>
}
const FieldGroup = (props: IFieldGroupProps) => {
  const {
    id,
    title,
    children,
    editComponent,
    editLabel = 'Edit',
    isInput,
    isEditable = true,
    keyPressed,
    handleTurnOnEditMode,
    handleTurnOffEditMode,
    isImage,
    onSubmit,
    isImageDirty,
    editingField,
    setEditingField,
    ...flexProps
  } = props
  const fieldGroupId: string = id ? id : title.toLocaleLowerCase()
  const {
    reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isDirty }
  } = useFormContext<IUser>()
  const { authStore } = useStores()
  const { user } = authStore
  const currentValue = useWatch({ name: fieldGroupId as keyof IUser, control })
  const formValue: IUser = getValues()
  const messageError: string = get(errors, `${fieldGroupId}.message`, '')
  const isEditing: boolean = editingField === fieldGroupId
  const isDisableSaveButton: boolean = isImage ? !isImageDirty : !isDirty || isSubmitting || !!messageError

  async function toggleEdit(isCancel?: boolean): Promise<void> {
    try {
      reset({ ...user, password: '', newPassword: '', confirmPassword: '' })
      if (!!handleTurnOnEditMode && !isEditing) {
        handleTurnOnEditMode()
      } else if (!!handleTurnOffEditMode && isEditing) {
        handleTurnOffEditMode()
      }
      if (!!setEditingField) {
        setEditingField(isCancel ? '' : fieldGroupId)
      }
    } catch (error) {
      const errorMessage: string = get(error, 'message', error)
      toast.error(errorMessage)
    }
  }

  async function resetOtherField(): Promise<void> {
    if (onSubmit) {
      const currentFormValue: IUser = formValue
      reset({ [fieldGroupId as keyof IUser]: currentValue } as IUser)
      await handleSubmit(onSubmit)()
      reset(currentFormValue)
      if (!!setEditingField) {
        setEditingField('')
      }
    }
  }

  const component = isInput
    ? cloneElement(children, {
        isReadOnly: false,
        variant: 'outline',
        fontWeight: 400,
        background: 'white',
        _hover: {
          background: 'white'
        },
        _focus: {
          background: 'white'
        },
        _active: {
          background: 'white'
        }
      })
    : editComponent

  useEffect(() => {
    user?.name && reset(user)
  }, [user])

  useEffect(() => {
    // *INFO: Handle press "Enter" or "Escape" key in editing mode
    if (isEditing) {
      if (keyPressed === 'Enter' && !isDisableSaveButton) {
        onSubmit && resetOtherField()
      } else if (keyPressed === 'Escape') {
        toggleEdit(true)
      }
    }
  }, [keyPressed])

  return (
    <FormControl id={fieldGroupId} isInvalid={!!messageError}>
      <Stack
        flexDirection={{ base: 'column', md: 'row' }}
        spacing={{ base: 2, md: 0 }}
        paddingBottom="0"
        {...flexProps}
      >
        <HStack
          minWidth={{ base: 'unset', md: '12rem' }}
          width={{ base: 'full', md: 'auto' }}
          justifyContent={{ base: 'space-between', md: 'flex-start' }}
          alignSelf={isEditing ? 'flex-start' : { base: 'flex-start', md: 'center' }}
          flex="1"
        >
          <Text
            display={!title ? 'none' : { base: isImage ? 'none' : 'block', md: 'block' }}
            lineHeight="24px"
            fontSize="md"
            maxWidth="10rem"
          >
            {title}
          </Text>
          <HStack
            display={{ base: !isEditing && isEditable && !isImage ? 'flex' : 'none', md: 'none' }}
            minWidth="max-content"
            justifyContent="flex-end"
            onClick={() => toggleEdit()}
            cursor="pointer"
          >
            <Icon iconName="teal-edit.svg" size={24} />
          </HStack>
        </HStack>
        <VStack width="full" spacing="4" alignItems="start">
          {isEditing ? component : children}
          {messageError && <FormErrorMessage>{messageError}</FormErrorMessage>}
          <HStack
            display={!isEditing ? 'none' : { base: isImage ? 'none' : 'flex', md: 'flex' }}
            marginLeft="12rem"
            width="full"
            justifyContent="flex-start"
          >
            <Button
              colorScheme="teal"
              variant="solid"
              form="account-setting-form"
              type="submit"
              isLoading={isSubmitting}
              disabled={isDisableSaveButton}
              width={{ base: 'full', md: 'auto' }}
            >
              Save
            </Button>
            <Button
              colorScheme="gray"
              variant="ghost"
              onClick={() => toggleEdit(true)}
              width={{ base: 'full', md: 'auto' }}
            >
              Cancel
            </Button>
          </HStack>
          <HStack
            display={{ base: !isEditing && isEditable && isImage ? 'flex' : 'none', md: 'none' }}
            minWidth="max-content"
            justifyContent="flex-end"
            cursor="pointer"
          >
            <Text fontSize="md" color="teal.500" as="button" type="submit" disabled={isSubmitting}>
              {editLabel}
            </Text>
          </HStack>
        </VStack>
        <HStack
          display={{ base: 'none', md: !isEditing && isEditable ? 'flex' : 'none' }}
          minWidth="max-content"
          justifyContent="flex-end"
          onClick={() => toggleEdit()}
          cursor="pointer"
        >
          <Icon iconName="teal-edit.svg" size={24} />
          <Text display={{ base: 'none', lg: 'inline-block' }} fontSize="md" color="teal.500" as="span">
            {editLabel}
          </Text>
        </HStack>
      </Stack>
    </FormControl>
  )
}

export default FieldGroup
