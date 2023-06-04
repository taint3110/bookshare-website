import { ChangeEvent, useEffect, useRef, useState, HTMLInputTypeAttribute } from 'react'
import { Avatar, Box, Input, Stack, StackDivider, InputProps } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import set from 'lodash/set'
import startCase from 'lodash/startCase'
import { observer } from 'mobx-react-lite'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateProfile } from 'API/authenticate'
import { PLATFORM, ServerErrorMessage as Message } from 'API/constants'
import { uploadFile } from 'API/fileUploader'
import { IUser } from 'interfaces/user'
import { getDirtyValues } from 'utils/common'
import { FormConTent, Title } from './accountSettingPage.styles'
import FieldGroup from './components/FieldGroup'
import { PhoneNumberInput } from './components/PhoneNumberInput'
import SecurityField from './components/SecurityField'
import SocialNetworks from './components/SocialNetworks'
import { IAccountSettingPageProps } from './constant'
import {
  getCountryDialCode,
  getFormattedPhoneNumber,
  getFormattedPhoneNumberWithCountryCode,
  getRawPhoneNumber,
  readOnlyInputProps
} from './utils'

const AccountSettingPage = (props: IAccountSettingPageProps) => {
  const { isCMS } = props
  const platform: PLATFORM = isCMS ? PLATFORM.CMS : PLATFORM.OWNER
  const { authStore } = useStores()
  const { user } = authStore
  const method = useForm<IUser>({ mode: 'onChange' })
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { dirtyFields, errors }
  } = method
  const phoneNumber: string | undefined = useWatch({ name: 'phoneNumber', control })
  const rawPhoneNumber: string | undefined = getRawPhoneNumber(phoneNumber ?? '')
  const avatarRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [selectedImage, selectImage] = useState<File | null>(null)
  const [isImageDirty, setIsImageDirty] = useState<boolean>(false)
  const [nameKeyPressed, setNameKeyPressed] = useState<string>('')
  const [phoneKeyPressed, setPhoneKeyPressed] = useState<string>('')
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false)
  const [editingField, setEditingField] = useState<string>('')
  let oldPreview: string = ''

  async function onSubmit(data: IUser): Promise<void> {
    let avatarUrl: string = user?.avatarUrl ?? ''
    if (selectedImage) {
      try {
        avatarUrl = await uploadFile(selectedImage)
      } catch (error) {
        toast.error('Something went wrong when uploading profile picture.')
      }
    }
    const userData: IUser = { ...getDirtyValues(dirtyFields, { ...data, phoneNumber: rawPhoneNumber }), avatarUrl }
    try {
      await updateProfile(userData, platform)
      toast.success('Update Profile Successfully')
      resetOtherField()
      await authStore.getMyUser(platform)
    } catch (error) {
      const errorMessage: string = get(error, 'message', error)
      const hasDefinedErrorMessage =
        errorMessage === Message.PASSWORD_INVALID || errorMessage === Message.PASSWORD_CONFIRM_INVALID
      toast.error(hasDefinedErrorMessage ? errorMessage : 'Update Profile Fail')
      hasDefinedErrorMessage && reset({ ...user, password: '', newPassword: '', confirmPassword: '' })
    }
  }
  function inputProps(
    name: keyof IUser,
    type: HTMLInputTypeAttribute = 'text',
    placeholder?: string,
    isEdit?: boolean,
    isRequired?: boolean
  ): InputProps {
    return {
      type,
      placeholder,
      variant: !isEdit ? 'unstyled' : 'outline',
      fontWeight: !isEdit ? '600' : '400',
      isReadOnly: !isEdit,
      color: 'gray.700',
      ...register(name, { required: isRequired ? `${startCase(name)} is required` : '' })
    }
  }
  function handleChooseAvatar(): void {
    setIsEditingAvatar(true)
    avatarRef.current?.click()
  }
  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>): void {
    if (!!event?.target?.files?.[0]) {
      selectImage(event?.target?.files?.[0])
      setIsImageDirty(true)
    }
  }
  function handleCancelSelectedAvatar(): void {
    setIsEditingAvatar(false)
    URL.revokeObjectURL(preview)
    set(avatarRef, 'current.value', '')
    selectImage(null)
    setPreview(oldPreview)
  }
  function resetOtherField(): void {
    const currentFormValue: IUser = getValues()
    reset(currentFormValue)
    setEditingField('')
  }

  useEffect(() => {
    set(user, 'phoneNumber', getFormattedPhoneNumberWithCountryCode(user?.phoneNumber ?? ''))
    user?.name && reset({ ...user, password: '', newPassword: '', confirmPassword: '' })
  }, [user])

  useEffect(() => {
    oldPreview = preview
    if (!selectedImage) {
      setPreview('')
      return
    }
    const objectUrl: string = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)
    //* INFO: disable unnecessary eslint rule eslint-disable-next-line consistent-return
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  return (
    <FormProvider {...method}>
      <form id="account-setting-form" onSubmit={handleSubmit(onSubmit)}>
        <FormConTent isCMS>
          <Stack spacing="6">
            <Title paddingTop={{ base: 0, md: 8 }}>General Information</Title>
            <Stack
              background="white"
              padding={{ base: 4, md: 8 }}
              spacing={{ base: 4, md: 6 }}
              divider={<StackDivider />}
              borderRadius="8px"
            >
              <FieldGroup
                title="Profile Photo"
                id="avatar"
                editLabel={!!user?.avatarUrl ? 'Change Image' : 'Add Image'}
                handleTurnOnEditMode={handleChooseAvatar}
                handleTurnOffEditMode={handleCancelSelectedAvatar}
                onSubmit={onSubmit}
                isInput
                isImage
                isImageDirty={isImageDirty}
                editingField={editingField}
                setEditingField={setEditingField}
              >
                <Stack direction="row" spacing="6" align="center" justifyContent={{ base: 'center', md: 'flex-start' }}>
                  <Box cursor="pointer">
                    <Avatar
                      size="xl"
                      name={user?.name}
                      src={preview || user?.avatarUrl}
                      onClick={isEditingAvatar ? handleChooseAvatar : undefined}
                    />
                  </Box>
                  <Input type="file" ref={avatarRef} accept={'image/*'} onChange={handleChangeAvatar} display="none" />
                </Stack>
              </FieldGroup>
              <FieldGroup
                title="Full Name"
                id="name"
                isInput
                onSubmit={onSubmit}
                keyPressed={nameKeyPressed}
                editingField={editingField}
                setEditingField={setEditingField}
              >
                <Input
                  maxLength={100}
                  {...inputProps('name', 'text', 'Full name', false, true)}
                  onKeyDown={(event) => setNameKeyPressed(event.key)}
                  noOfLines={[1, 1]}
                />
              </FieldGroup>
              <FieldGroup title="Email Address" id="email" isInput isEditable={false}>
                <Input maxLength={50} {...inputProps('email', 'email', 'Email address')} />
              </FieldGroup>
              <FieldGroup
                title="Phone Number"
                id="phoneNumber"
                onSubmit={errors?.phoneNumber ? undefined : onSubmit}
                onKeyDown={(event) => setPhoneKeyPressed(event.key)}
                keyPressed={phoneKeyPressed}
                editingField={editingField}
                setEditingField={setEditingField}
                editComponent={
                  <Controller
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\(?\+[0-9]{1,3}\)? \d{3} \d{3} \d{4}$/,
                        message: 'Invalid Phone Number'
                      }
                    }}
                    name="phoneNumber"
                    render={({ field: { onChange } }) => (
                      <PhoneNumberInput
                        onChange={onChange}
                        value={getFormattedPhoneNumber(phoneNumber ?? '')}
                        countryCode={getCountryDialCode(phoneNumber ?? '')}
                      />
                    )}
                  />
                }
              >
                <Input maxLength={20} {...inputProps('phoneNumber')} />
              </FieldGroup>
              <FieldGroup title="Account Type" id="type" isEditable={false}>
                <Input {...readOnlyInputProps()} defaultValue={isCMS ? 'HR Staff Account' : 'Owner Account'} />
              </FieldGroup>
              <FieldGroup title="Account Role" id="role" isEditable={false} hidden={!isCMS}>
                <Input {...readOnlyInputProps()} defaultValue="God Mode" />
              </FieldGroup>
            </Stack>
            <Title>Security</Title>
            <SecurityField
              onSubmit={onSubmit}
              editingField={editingField}
              setEditingField={setEditingField}
              inputProps={inputProps}
            />
            {/* INFO: temporarily hide social network section when we need this feature */}
            <SocialNetworks />
          </Stack>
        </FormConTent>
      </form>
    </FormProvider>
  )
}
export default observer(AccountSettingPage)
