import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PLATFORM, ServerErrorMessage } from 'API/constants'
import FormInput from 'components/FormInput'
import PasswordField from 'components/PasswordField'
import { EAccountType } from 'enums/user'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthenticatePageType } from '../../constant'
import UnderlineLink from '../UnderlineLink'

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  accountType?: EAccountType
}

interface ISignUpFormProp {
  setPageType: (type: AuthenticatePageType) => void
}

const SignUpForm = (props: ISignUpFormProp) => {
  const { setPageType } = props
  const { authStore, spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const method = useForm<SignUpFormData>()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = method
  const router = useRouter()
  const { route } = router
  const platform: PLATFORM = route.includes('cms') ? PLATFORM.CMS : PLATFORM.WEBSITE
  async function onSubmit(data: SignUpFormData) {
    try {
      await authStore.signUp(
        { ...data, accountType: platform === PLATFORM.CMS ? EAccountType.STAFF : EAccountType.CUSTOMER },
        platform
      )
    } catch (error) {
      const errorMessage: string = String(get(error, 'message', ''))
      if (errorMessage === ServerErrorMessage.PASSWORD_INVALID || errorMessage === ServerErrorMessage.USER_NOT_FOUND) {
        setError('password', { type: 'manual', message: 'The email or password is incorrect' })
        setError('email', { type: 'manual', message: 'The email or password is incorrect' })
      } else {
        toast.error(errorMessage)
      }
    }
  }
  function onClickForgot(): void {
    setPageType(AuthenticatePageType.FORGOT_PASSWORD)
  }
  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <FormControl id="email" isInvalid={!!get(errors, 'email', false)}>
            <FormLabel marginBottom={2} color="gray.700">
              Email Address
            </FormLabel>
            <Input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email Address is required'
              })}
            />
            <FormErrorMessage>{errors?.email && errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormInput name="name" label="Name" placeholder="Enter name" isRequired />
          <PasswordField />
          <PasswordField name="confirmPassword" label="Confirm Password" />
          <Flex align="center" justifyContent="space-between">
            <UnderlineLink fontSize="sm" color="blue.500" whiteSpace="nowrap" onClick={onClickForgot}>
              Forgot Password?
            </UnderlineLink>
          </Flex>
          <Button type="submit" colorScheme="teal" size="md" fontSize="md" isLoading={isLoading || isSubmitting}>
            Sign up
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default observer(SignUpForm)
