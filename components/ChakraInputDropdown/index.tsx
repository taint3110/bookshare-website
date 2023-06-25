import { Search2Icon } from '@chakra-ui/icons'
import { FormControl, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react'
import { GroupBase, MultiValue, Select } from 'chakra-react-select'
import { EZIndexLayer } from 'enums/theme'
import { IOption } from 'interfaces/common'
import get from 'lodash/get'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { Controller, useFormContext } from 'react-hook-form'
import { backGroundTeal500WithOpacity } from 'theme/globalStyles'
import { IChakraInputDropdownProps } from './types'

const ChakraInputDropdown = (props: IChakraInputDropdownProps) => {
  const {
    name,
    label,
    optionsData,
    placeholder = '',
    isSearching = false,
    defaultValue,
    closeMenuOnSelect = true,
    maxTextLength,
    zIndex
  } = props
  const { control, setValue } = useFormContext()

  function getInputValue(option: MultiValue<IOption>): IOption {
    const optionLabel: string = get(option, 'label', '')
    const optionValue: string = get(option, 'value', '')
    if (maxTextLength && optionLabel) {
      const newLabel: string = maxTextLength ? truncate(optionLabel, { length: maxTextLength }) : optionLabel
      return { label: newLabel, value: optionValue }
    }
    return { label: optionLabel, value: optionValue }
  }

  return (
    <FormControl width="full" id={name}>
      <FormLabel marginBottom={2} color="gray.700">
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <InputGroup zIndex={zIndex} borderRadius="6px" width="full" background="white">
            <Select<IOption, true, GroupBase<IOption>>
              {...field}
              colorScheme="teal"
              options={optionsData}
              placeholder={placeholder}
              closeMenuOnSelect={closeMenuOnSelect}
              defaultValue={defaultValue}
              size="md"
              isClearable
              onChange={(option: MultiValue<IOption>) => {
                setValue(name, getInputValue(option))
              }}
              chakraStyles={{
                container: (provided: Record<string, unknown>) => ({
                  ...provided,
                  width: 'full'
                }),
                dropdownIndicator: (provided: Record<string, unknown>) => ({
                  ...provided,
                  bg: 'transparent',
                  px: 2,
                  cursor: 'inherit'
                }),
                indicatorSeparator: (provided: Record<string, unknown>) => ({
                  ...provided,
                  display: 'none'
                }),
                downChevron: (provided: Record<string, unknown>) => ({
                  ...provided,
                  ...(isSearching ? { display: 'none' } : {})
                }),
                clearIndicator: (provided: Record<string, unknown>) => ({
                  ...provided,
                  display: 'none'
                }),
                menu: (provided: Record<string, unknown>) => ({
                  ...provided,
                  zIndex: EZIndexLayer.INPUT_DROPDOWN
                }),
                option: (provided: Record<string, unknown>, { isFocused, isSelected }) => ({
                  ...provided,
                  color: 'gray.800',
                  backgroundColor: isFocused || isSelected ? backGroundTeal500WithOpacity : 'auto',
                  ':active': {
                    backgroundColor: isSelected ? backGroundTeal500WithOpacity : 'auto'
                  }
                })
              }}
            />
            {isSearching && (
              <InputRightElement pointerEvents="none">
                <Search2Icon color="gray.700" />
              </InputRightElement>
            )}
          </InputGroup>
        )}
      />
    </FormControl>
  )
}

export default observer(ChakraInputDropdown)
