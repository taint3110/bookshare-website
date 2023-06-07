import React from 'react'
import { HStack, VStack, Text } from '@chakra-ui/react'
import { get, slice } from 'lodash'
import { Row } from 'react-table'
import { ITableHeader } from 'components/Table'

export default function getSubComponent(headerList: ITableHeader[], excludedNumber: number = 0) {
  return function initSubComponent(row: Row, rowIndex: number) {
    return (
      <VStack alignItems="flex-start" paddingLeft={12} spacing={0}>
        {slice(headerList, excludedNumber, headerList.length)
          .filter((header) => header.accessor !== 'actions')
          .map((header, index) => (
            <HStack key={`sub-${rowIndex}-${index}`} padding="8px 24px">
              <Text fontSize="sm" fontWeight="500" color="gray.500">
                {header.Header}:
              </Text>
              <Text fontSize="sm" fontWeight="600">
                {get(row, `original.${header.accessor}`, '')}
              </Text>
            </HStack>
          ))}
      </VStack>
    )
  }
}
