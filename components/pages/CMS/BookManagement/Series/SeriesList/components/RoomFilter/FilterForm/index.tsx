import React from 'react'
import { FormControl, VStack, FormLabel, Checkbox } from '@chakra-ui/react'
import { EZIndexLayer } from 'enums/theme'
import { useFormContext, Controller } from 'react-hook-form'
import ChakraInputDropdown from 'components/ChakraInputDropdown'
import CustomDatePickerWithMask from 'components/CustomDaterRangePickerWithMask'
import { roomFilterPrice } from 'components/pages/ListingPage/components/RoomFilter/constants'
import { IOption } from 'interfaces/common'
import { IRoomFilterItem } from 'interfaces/listing'
import { IProperty } from 'interfaces/property'
import { getValidArray } from 'utils/common'
import { bathroomTypeOptions } from './constants'
import { getHouseOptionSelect } from './utils'

const PICKER_DATE_FORMAT: string = 'yyyy/MM/dd'
const DATE_INPUT_FORMAT: string = '####/##/## - ####/##/##'
const DATE_INPUT_MASK: string[] = ['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']

interface IRoomFilterFormProps {
  houseList: IProperty[]
}

const RoomFilterForm = (props: IRoomFilterFormProps) => {
  const { houseList } = props
  const { control, register, setValue } = useFormContext()

  return (
    <VStack background="white" marginY={6} spacing={6}>
      <ChakraInputDropdown
        name="house"
        label="House"
        optionsData={getHouseOptionSelect(houseList)}
        placeholder="Search House by ID, name or address"
        isSearching
        maxTextLength={43}
        zIndex={EZIndexLayer.FILTER_BAR}
      />
      <ChakraInputDropdown
        name="price"
        label="Price"
        placeholder="Select Price"
        placeholderColor="gray.700"
        optionsData={getValidArray(roomFilterPrice).map((price: IRoomFilterItem) => {
          return {
            label: price?.title,
            value: price?.value
          } as IOption
        })}
      />
      <FormControl id="availableDate">
        <FormLabel color="gray.700">Move-in available</FormLabel>
        <Controller
          name="availableDate"
          control={control}
          render={(datePickerProps) => {
            return (
              <CustomDatePickerWithMask
                name="availableDate"
                dateFormat={PICKER_DATE_FORMAT}
                inputFormat={DATE_INPUT_FORMAT}
                inputMask={DATE_INPUT_MASK}
                inputPlaceholder="____/__/__ - ____/__/__"
                setValue={setValue}
                {...datePickerProps}
              />
            )
          }}
        />
      </FormControl>
      <FormControl id="bathroomType">
        <FormLabel color="gray.700">Bathroom type</FormLabel>
        <VStack alignItems="flex-start">
          {getValidArray(bathroomTypeOptions).map((option: IOption, index: number) => {
            const inputName: string = option?.value
            return (
              <Controller
                key={index}
                name={inputName}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox colorScheme="teal" color="gray.700" isChecked={value} onChange={onChange}>
                    {option?.label}
                  </Checkbox>
                )}
              />
            )
          })}
        </VStack>
      </FormControl>
    </VStack>
  )
}

export default RoomFilterForm
