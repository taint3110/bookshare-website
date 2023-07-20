import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Menu, MenuList, Text } from '@chakra-ui/react'
import { IPagination } from 'components/Table'
import { EBreakPoint } from 'enums/theme'
import useBreakPoint from 'hooks/useBreakPoint'
import DropdownButton from '../../../Dropdown/DropdownButton'
import DropdownSelection from '../../../Dropdown/DropdownSelection'
import { truncatePagination } from './utils'
import { observer } from 'mobx-react'

export interface IPaginationProps {
  pagination: IPagination
  pageSize: number
  showPageSize?: boolean
  showGoToPage?: boolean
}

const Pagination = (props: IPaginationProps) => {
  const { pagination, pageSize, showPageSize = true, showGoToPage = false } = props
  const { gotoPage, pageIndex, tableLength } = pagination
  const isMobile: boolean = useBreakPoint(EBreakPoint.BASE, EBreakPoint.MD)

  const numberOfPages: number = Math.ceil(tableLength / pageSize)

  const truncatedPagination: string[] = truncatePagination(Number(pageIndex), Number(numberOfPages))

  function goPreviousPage(): void {
    gotoPage(Number(pageIndex) - 1)
  }

  function goNextPage(): void {
    gotoPage(Number(pageIndex) + 1)
  }

  const SelectPageDropdown = () => (
    <>
      <Flex flexDirection="row" marginLeft={4} display={isMobile ? 'inline-flex' : 'unset'}>
        <Menu closeOnSelect={true} autoSelect={false} computePositionOnMount>
          {({ isOpen }) => (
            <>
              <DropdownButton
                placeHolder={isMobile ? `${pageIndex}` : 'Go To'}
                isOpen={isOpen}
                minWidth={{ base: '134px', md: '150px' }}
                width={{ base: '134px', md: '150px' }}
                isTable
              />
              <MenuList
                zIndex="1001"
                minWidth={{ base: '134px', md: '150px' }}
                padding={tableLength === 0 ? '0' : 'none'}
                border={tableLength === 0 ? '0' : 'none'}
              >
                {Array.from({ length: Math.ceil(tableLength / pageSize) }, (_, i) => i + 1).map((option) => (
                  <DropdownSelection
                    key={option}
                    onClick={() => gotoPage(Number(option))}
                    width={{ base: '134px', md: '150px' }}
                    label={option}
                    isSelected={option === pageIndex}
                    isTable
                  />
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </>
  )

  return (
    <Flex justifyContent={{ base: 'center', md: 'space-between' }} hidden={numberOfPages < 1} flexWrap="nowrap">
      <Box gap={2} marginLeft={showGoToPage ? 'auto' : 0}>
        <Button
          colorScheme="gray"
          variant="outline"
          background={{ base: 'teal.500', md: 'gray.50' }}
          borderColor="gray.200"
          paddingX={{ base: 6, md: 2 }}
          marginRight={{ base: 0, md: 2 }}
          isDisabled={pageIndex === 1}
          onClick={goPreviousPage}
          color={{ base: 'white', md: 'gray.800' }}
          _hover={{ backgroundColor: { base: 'teal.600', md: 'unset' } }}
        >
          {!isMobile ? <Icon width={6} height={6} as={ChevronLeftIcon} /> : 'Prev'}
        </Button>
        {!isMobile &&
          Array.isArray(truncatedPagination) &&
          truncatedPagination.length > 0 &&
          truncatedPagination.map((item: string, index: number) => {
            if (!item) {
              return <Text key={index}>{item}</Text>
            }
            const isActive = pageIndex === Number(item)
            return (
              <Button
                colorScheme={isActive ? 'teal' : 'gray'}
                variant={isActive ? 'solid' : 'outline'}
                background={!isActive ? 'gray.50' : 'teal'}
                borderColor="gray.200"
                padding={2}
                marginRight={2}
                lineHeight={1.5}
                key={`pagination-${index}`}
                onClick={() => (isActive || item === '...' ? {} : gotoPage(Number(item)))}
                cursor={isActive || item === '...' ? 'default' : 'pointer'}
              >
                {item}
              </Button>
            )
          })}
        {isMobile && <SelectPageDropdown />}
        <Button
          colorScheme="gray"
          variant="outline"
          paddingX={{ base: 6, md: 2 }}
          marginLeft={{ base: 4, md: 0 }}
          background={{ base: 'teal.500', md: 'gray.50' }}
          borderColor="gray.200"
          isDisabled={pageIndex === numberOfPages}
          onClick={goNextPage}
          color={{ base: 'white', md: 'gray.800' }}
          _hover={{ backgroundColor: { base: 'teal.600', md: 'unset' } }}
        >
          {!isMobile ? <Icon width={6} height={6} as={ChevronRightIcon} /> : 'Next'}
        </Button>
      </Box>
      {showPageSize && !isMobile && (
        <Flex flexDirection="row" marginLeft={4}>
          <Text display={{ base: 'none', lg: 'flex' }} marginRight={4} alignSelf="center" fontWeight={500}>
            Show
          </Text>
        </Flex>
      )}
      {showGoToPage && !isMobile && <SelectPageDropdown />}
    </Flex>
  )
}

export default observer(Pagination)
