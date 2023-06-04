import React, { useState, useEffect, ClipboardEvent } from 'react'
import { ChevronDownIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import { AsYouType } from 'libphonenumber-js'
import NumberFormat from 'react-number-format'
import Flag from 'react-world-flags'
import { backGroundTeal500WithOpacity } from 'theme/globalStyles'
import { PhoneNumberInputProps } from 'types/states-cities-db'
import { ECountryCode, ECountryDialCode } from '../../constant'
import { getFormattedPhoneNumberWithCountryCode } from '../../utils'
import { countries, ICountry } from './constants'

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const { onChange, value, countryCode } = props
  const [phoneNumber, setPhoneNumber] = useState<string>(value)
  const [country, setCountry] = useState<ECountryDialCode>(countryCode)
  const [code, setCode] = useState<ECountryCode>(
    countries.find((item: ICountry) => item.dialCode === countryCode)?.code ?? ECountryCode.US
  )

  useEffect(() => {
    if (phoneNumber !== '') {
      onChange(`(${country}) ${phoneNumber}`)
    }
  }, [country, phoneNumber, onChange])

  const onCountryClick = (codeNum: ECountryDialCode) => {
    const parsedNumber = new AsYouType().input(`(${country}) ${phoneNumber}`)
    setCode(countries.find((item: ICountry) => item.dialCode === codeNum)?.code ?? ECountryCode.US)
    setCountry(codeNum)
    parsedNumber && onChange(parsedNumber)
  }

  const onPhoneNumberChange = (event: { target: { value: string } }) => {
    const eventValue = event.target.value
    const parsedNumber = new AsYouType().input(`(${country}) ${phoneNumber}`)

    setPhoneNumber(eventValue)
    parsedNumber && onChange(parsedNumber)
  }

  function onPastePhoneInput(event: ClipboardEvent<HTMLInputElement>): void {
    const clipboardData: DataTransfer = event?.clipboardData
    const pastedPhoneNumber: string = clipboardData?.getData('Text')?.replace(/\n/g, '')
    const phoneNumberValue: string = getFormattedPhoneNumberWithCountryCode(
      pastedPhoneNumber?.replace(country, '') ?? ''
    )
    setPhoneNumber(phoneNumberValue)
  }

  return (
    <InputGroup>
      <InputLeftElement width="6rem">
        <Menu closeOnSelect={true} autoSelect={false} computePositionOnMount>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                background="transparent"
                as={Button}
                boxShadow="none !important"
                rightIcon={<ChevronDownIcon />}
                _hover={{ background: 'transparent' }}
                _active={{ background: 'transparent' }}
              >
                {code ? <Flag code={code} style={{ height: '24px' }} /> : <PhoneIcon />}
              </MenuButton>
              <MenuList zIndex="1001">
                {countries.map((state) => (
                  <MenuItem
                    key={state.name}
                    padding="8px 16px"
                    onClick={() => onCountryClick(state.dialCode)}
                    _hover={{ background: backGroundTeal500WithOpacity }}
                  >
                    <Flag code={state.code} style={{ width: '20px' }} />
                    <Text fontWeight="400" color="gray.700" paddingLeft={2} fontSize="md">
                      {`${state.name}`}
                    </Text>
                    <Text fontWeight="400" color="gray.500" paddingLeft={2} fontSize="sm">
                      {`(${state.dialCode})`}
                    </Text>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </InputLeftElement>
      <Input
        as={NumberFormat}
        paddingLeft="6rem"
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        placeholder="Phone number"
        format="### ### ####"
        onPaste={onPastePhoneInput}
      />
    </InputGroup>
  )
}
