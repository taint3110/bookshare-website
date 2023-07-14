import { Button, Stack, Text } from '@chakra-ui/react'
import { resetPassword } from 'API/authenticate'
import PasswordField from 'components/PasswordField'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import routes from 'routes'

export interface ResetPasswordFormData {
  newPassword: string
  confirmPassword: string
}

const ResetPassword = () => {
  const method = useForm<ResetPasswordFormData>()
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = method
  const router = useRouter()
  const resetPasswordToken: string = String(get(router, 'query.resetPasswordToken')) || ''

  async function onSubmit(data: ResetPasswordFormData): Promise<void> {
    const result = await resetPassword({ ...data, resetPasswordToken })
    if (!result) {
      toast.error('Something wrong happened')
    } else {
      toast.success('Reset password successfully')
      router.push(routes.cms.login.value)
    }
  }

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Text fontSize="md" color="gray.700">
            Please provide your new password
          </Text>
          <PasswordField name="newPassword" label="New Password" />
          <PasswordField name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />
          <Button type="submit" colorScheme="teal" size="md" fontSize="md" isLoading={isSubmitting}>
            Reset Password
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default ResetPassword
