import { Fragment, HTMLInputTypeAttribute } from 'react'
import { Input, InputProps } from '@chakra-ui/react'
import { IUser } from 'interfaces/user'

interface IPasswordFieldGroupProps {
  inputProps: (
    name: keyof IUser,
    type: HTMLInputTypeAttribute,
    placeholder?: string,
    isEdit?: boolean,
    isRequired?: boolean
  ) => InputProps
}

const PasswordFieldGroup = (props: IPasswordFieldGroupProps) => {
  const { inputProps } = props
  return (
    <Fragment>
      <Input maxLength={50} minLength={6} {...inputProps('password', 'password', 'Current Password', true, true)} />
      <Input maxLength={50} minLength={6} {...inputProps('newPassword', 'password', 'New Password', true)} />
      <Input maxLength={50} minLength={6} {...inputProps('confirmPassword', 'password', 'Confirm Password', true)} />
    </Fragment>
  )
}

export default PasswordFieldGroup
