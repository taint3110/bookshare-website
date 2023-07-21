import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Checkbox, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { IOption } from 'interfaces/common'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { getValidArray } from 'utils/common'

dayjs.extend(advancedFormat)

interface ISelectCategoriesProps {
  categories: IOption[]
  checkedItems: string[]
  setCheckedItems: (checkedItems: string[]) => void
}

const SelectCategories = (props: ISelectCategoriesProps) => {
  const { categories, checkedItems, setCheckedItems } = props
  const checkItemLength: number = checkedItems?.length ?? 0
  const categoryList: string[] = getValidArray(categories).map((item: IOption) => String(item.value))
  const allChecked: boolean = checkedItems?.length === getValidArray(categoryList)?.length
  function toggleChecked(item: string): void {
    if (checkedItems.filter((checkedItem) => checkedItem === item).length > 0) {
      setCheckedItems(checkedItems.filter((currentItem) => currentItem !== item))
    } else {
      setCheckedItems([...checkedItems, item])
    }
  }

  function toggleAll(): void {
    setCheckedItems(allChecked ? [] : categoryList)
  }

  function getCategoryLabel(item: string): string {
    const currentCategory: IOption | undefined = getValidArray(categories).find(
      (category: IOption) => category.value === item
    )
    return currentCategory?.label ?? ''
  }

  function getCategoryInputLabel(item: string): string {
    const label: string | undefined = categories.find((category) => category?.value === item)?.label
    return label ?? ''
  }

  const LeaseLengthCheckList = () =>
    useMemo(
      () => (
        <>
          <MenuItem onClick={toggleAll} closeOnSelect={false}>
            <HStack width="stretch" cursor="pointer">
              <Checkbox
                isChecked={allChecked}
                colorScheme="teal"
                isIndeterminate={!allChecked && !!checkItemLength}
                pointerEvents="none"
              >
                All Options
              </Checkbox>
            </HStack>
          </MenuItem>
          {getValidArray(categoryList).map((item: string, index: number) => (
            <MenuItem onClick={() => toggleChecked(item)} key={index}>
              <HStack width="stretch" cursor="pointer">
                <Checkbox
                  colorScheme="teal"
                  tabIndex={-1}
                  isChecked={checkedItems.findIndex((checkedItem) => checkedItem === item) > -1}
                  pointerEvents="none"
                >
                  {getCategoryLabel(item)}
                </Checkbox>
              </HStack>
            </MenuItem>
          ))}
        </>
      ),
      [categoryList]
    )

  return (
    <>
      <HStack spacing="14px" maxHeight={6} marginBottom={2} position="relative">
        <Text fontWeight={500} color="gray.700" lineHeight={6} marginBottom={0} marginInlineEnd={0}>
          Categories
        </Text>
      </HStack>
      <Menu matchWidth closeOnSelect={false} computePositionOnMount>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              isActive={isOpen}
              border="1px solid #E2E8F0"
              width="stretch"
              background="white"
              iconSpacing="20px"
              _active={{ background: 'white' }}
              rightIcon={<ChevronDownIcon />}
            >
              <Text fontSize="md" color="gray.700" whiteSpace="nowrap" fontWeight="normal" textAlign="start">
                {checkItemLength
                  ? allChecked
                    ? 'All categories'
                    : `${getCategoryInputLabel(checkedItems[0])}${
                        checkItemLength > 1 ? `, +${checkItemLength - 1}` : ''
                      }`
                  : 'Select Categories'}
              </Text>
            </MenuButton>
            <MenuList>
              <LeaseLengthCheckList />
            </MenuList>
          </>
        )}
      </Menu>
    </>
  )
}
export default observer(SelectCategories)
