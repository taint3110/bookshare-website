import { useState } from 'react'
import { FormLabel, FormControl, Input, Button, FormErrorMessage, Stack, Text } from '@chakra-ui/react'
import get from 'lodash/get'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { forgotPassword } from 'API/authenticate'
import { PLATFORM } from 'API/constants'

export interface IForgotPasswordFormData {
  email: string
  platform: PLATFORM
}

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const method: UseFormReturn<IForgotPasswordFormData> = useForm<IForgotPasswordFormData>({
    defaultValues: { platform: PLATFORM.CMS }
  })
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = method

  function onSubmit(data: IForgotPasswordFormData): void {
    forgotPassword(data)
    setIsSubmitted(true)
  }

  const text: string = isSubmitted
    ? 'Please check your email and follow the instruction to reset your password'
    : 'Submit your email and we will send you a link to reset your password'

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Text fontSize="md" color="gray.700">
            {text}
          </Text>
          {!isSubmitted && (
            <>
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
              <Button type="submit" colorScheme="teal" size="md" fontSize="md" isLoading={isSubmitting}>
                Submit
              </Button>
            </>
          )}
        </Stack>
      </form>
    </FormProvider>
  )
}

export default ForgotPassword
