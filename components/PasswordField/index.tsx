import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import styles from './styles.module.scss'

export interface IPasswordField {
  autoFocus?: boolean
  name?: string
  label?: string
  placeholder?: string
  height?: string
  hasInfoIcon?: boolean
}
const PasswordField = (props: IPasswordField) => {
  const {
    name = 'password',
    label = 'Password',
    placeholder = 'Enter your password',
    autoFocus,
    height = '40px',
    hasInfoIcon
  } = props
  const [isShow, toggleShow] = useState(false)

  function onClickShowButton(): void {
    toggleShow(!isShow)
  }

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl id={name} isInvalid={errors[name] ? true : false}>
      <HStack>
        <FormLabel marginBottom={2} marginRight={2} color="gray.700">
          {label}
        </FormLabel>
        {hasInfoIcon && (
          <InfoOutlineIcon
            className={styles.infoIcon}
            color="teal.500"
            display={{ base: 'none', lg: 'block' }}
            boxSize={3}
          />
        )}
      </HStack>
      <InputGroup>
        <InputRightElement height={height}>
          <IconButton
            background="transparent !important"
            variant="ghost"
            aria-label={isShow ? 'Mask password' : 'Reveal password'}
            icon={isShow ? <HiEyeOff color="#A0AEC0" /> : <HiEye color="#A0AEC0" />}
            onClick={onClickShowButton}
            height={height}
          />
        </InputRightElement>
        <Input
          autoFocus={autoFocus}
          type={isShow ? 'text' : 'password'}
          autoComplete="password"
          placeholder={placeholder}
          height={height}
          {...register(name, {
            required: `${label} is required`
          })}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name] && String(errors[name]?.message)}</FormErrorMessage>
    </FormControl>
  )
}

PasswordField.displayName = 'PasswordField'
export default PasswordField
