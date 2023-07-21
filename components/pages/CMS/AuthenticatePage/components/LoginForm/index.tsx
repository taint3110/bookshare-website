import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PLATFORM, ServerErrorMessage } from 'API/constants'
import PasswordField from 'components/PasswordField'
import { useStores } from 'hooks/useStores'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthenticatePageType } from '../../constant'
import UnderlineLink from '../UnderlineLink'

export interface LoginFormData {
  email: string
  password: string
  isRemember: boolean
}

interface ILoginFormProp {
  setPageType: (type: AuthenticatePageType) => void
}

const LoginForm = (props: ILoginFormProp) => {
  const { setPageType } = props
  const { authStore, spinnerStore } = useStores()
  const { isLoading } = spinnerStore
  const method = useForm<LoginFormData>()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = method
  const router = useRouter()
  const { route } = router
  const platform: PLATFORM = route.includes('cms') ? PLATFORM.CMS : PLATFORM.WEBSITE
  const [isRemember, setRemember] = useState(true)
  async function onSubmit(data: LoginFormData) {
    try {
      await authStore.login({ ...data, isRemember }, platform)
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
  function toggleCheckBox() {
    setRemember(!isRemember)
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
          <PasswordField />
          <Flex align="center" justifyContent="space-between">
            <Box onClick={toggleCheckBox} cursor="pointer">
              <Checkbox
                size="md"
                isChecked={isRemember}
                colorScheme="teal"
                pointerEvents="none"
                sx={{
                  '.chakra-checkbox__control': {
                    '&:not([data-checked])': { bg: 'white' },
                    rounded: 'base',
                    borderWidth: '1px'
                  },
                  '.chakra-checkbox__label': { fontSize: 'sm', color: 'gray.700' }
                }}
              >
                Remember me
              </Checkbox>
            </Box>
            <UnderlineLink fontSize="sm" color="blue.500" whiteSpace="nowrap" onClick={onClickForgot}>
              Forgot Password?
            </UnderlineLink>
          </Flex>
          <Button type="submit" colorScheme="teal" size="md" fontSize="md" isLoading={isLoading || isSubmitting}>
            Login
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default observer(LoginForm)
