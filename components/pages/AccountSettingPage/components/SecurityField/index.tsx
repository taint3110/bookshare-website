import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react'
import { HStack, Input, InputProps } from '@chakra-ui/react'
import { IUser } from 'interfaces/user'
import FieldGroup from '../FieldGroup'
import PasswordFieldGroup from '../PasswordFieldGroup'

export interface ISecurityFieldProps {
  onSubmit: (data: IUser) => Promise<void>
  editingField?: string
  setEditingField?: Dispatch<SetStateAction<string>>
  inputProps: (
    name: keyof IUser,
    type: HTMLInputTypeAttribute,
    placeholder?: string,
    isEdit?: boolean,
    isRequired?: boolean
  ) => InputProps
}

const SecurityField = (props: ISecurityFieldProps) => {
  const { onSubmit, editingField, setEditingField, inputProps } = props
  return (
    <HStack
      width="full"
      background="white"
      padding={{ base: 4, md: 8 }}
      paddingBottom={{ base: 2, md: 8 }}
      borderRadius="8px"
    >
      <FieldGroup
        title="Password"
        editLabel="Change Password"
        onSubmit={onSubmit}
        editingField={editingField}
        setEditingField={setEditingField}
        editComponent={<PasswordFieldGroup inputProps={inputProps} />}
      >
        <Input
          display={{ base: 'none', md: 'block' }}
          maxLength={50}
          minLength={6}
          {...inputProps('password', 'password', '********')}
        />
      </FieldGroup>
    </HStack>
  )
}

export default SecurityField
