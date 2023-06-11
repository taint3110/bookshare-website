import { ButtonProps, InputProps } from '@chakra-ui/react'
import { ECountryDialCode } from './constant'

export function socialButtonProps(color: string): ButtonProps {
  return {
    isFullWidth: true,
    variant: 'outline',
    color: 'white',
    disabled: true,
    marginBottom: { base: 4, md: 0 },
    _hover: { bg: `${color}.700` },
    _active: { bg: `${color}.700` }
  }
}

export function readOnlyInputProps(): InputProps {
  return {
    type: 'text',
    isReadOnly: true,
    variant: 'unstyled',
    color: 'gray.700',
    fontWeight: 600
  }
}

export function getCountryDialCode(phoneNumber: string): ECountryDialCode {
  const countryDialCode: string | ECountryDialCode = phoneNumber?.split(') ')[0]?.split('(')[1] ?? ECountryDialCode.US
  return countryDialCode as ECountryDialCode
}

export function getFormattedPhoneNumber(phoneNumber: string): string {
  const phoneNumberValue: string = phoneNumber?.split(') ')[1] ?? ''
  return phoneNumberValue
}

export function getRawPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[^0-9\+]/g, '')
}

export function getFormattedPhoneNumberWithCountryCode(rawPhoneNumber: string): string {
  const cleanedPhoneNumber: string = `${rawPhoneNumber}`.replace(/\D/g, '')
  const matchPhoneNumber: RegExpMatchArray | null = cleanedPhoneNumber.match(/^([0-9]{1,3})?(\d{3})(\d{3})(\d{4})$/)
  if (matchPhoneNumber) {
    const formattedCountryCode: string = matchPhoneNumber[1] ? `(+${matchPhoneNumber[1]}) ` : ''
    return `${formattedCountryCode}${matchPhoneNumber[2]} ${matchPhoneNumber[3]} ${matchPhoneNumber[4]}`
  }
  return ''
}
