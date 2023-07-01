import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Box,
  Grid,
  Text,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Center
} from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import {
  IMockBook,
  IMockCategory,
  MockBookConditions,
  MockBookCovers,
  mockCategories
} from './components/BookCard/mockData'
import BookCard from './components/BookCard'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Pagination from 'components/BookList/components/Pagination'

export interface IBookListProps {
  books: IMockBook[]
  pageSize: number
  listLength: number
  showGoToPage?: boolean
}

const BookList = (props: IBookListProps) => {
  const { books, pageSize = 12, listLength, showGoToPage = false } = props
  // Filter for categories
  const [selectedCategories, setSelectedCategories] = useState<string | string[]>([])
  const [isCategoryCheckedAll, setisCategoryCheckedAll] = useState<boolean>()
  // Filter for condition
  const [selectedConditions, setSelectedConditions] = useState<string | string[]>([])
  const [isConditionCheckedAll, setisConditionCheckedAll] = useState<boolean>()
  // Filter for covers
  const [selectedCovers, setSelectedCovers] = useState<string | string[]>([])
  const [isCoverCheckedAll, setisCoverCheckedAll] = useState<boolean>()

  const [selectedSort, setSelectedSort] = useState<string | string[]>()
  const categories = getValidArray(mockCategories)
  const bookConditions = getValidArray(MockBookConditions)
  const bookCovers = getValidArray(MockBookCovers)

  const handleCategoryChange = (selectedValues: string | string[]) => {
    setSelectedCategories(selectedValues)
    if (selectedValues.length < categories.length) {
      setisCategoryCheckedAll(false)
    } else if (selectedValues.length === categories.length) {
      setisCategoryCheckedAll(true)
    }
  }

  const handleCategoryCheckAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setisCategoryCheckedAll(checked)
    if (checked) {
      const allOptions = categories.map((item) => item.name)
      setSelectedCategories(allOptions)
    } else {
      setSelectedCategories([])
    }
  }

  const handleConditionChange = (selectedValues: string | string[]) => {
    setSelectedConditions(selectedValues)
    if (selectedValues.length < bookConditions.length) {
      setisConditionCheckedAll(false)
    } else if (selectedValues.length === bookConditions.length) {
      setisConditionCheckedAll(true)
    }
  }

  const handleConditionCheckAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setisConditionCheckedAll(checked)
    if (checked) {
      const allOptions = bookConditions.map((item) => item)
      setSelectedConditions(allOptions)
    } else {
      setSelectedConditions([])
    }
  }

  const handleCoverChange = (selectedValues: string | string[]) => {
    setSelectedCovers(selectedValues)
    if (selectedValues.length < bookCovers.length) {
      setisCoverCheckedAll(false)
    } else if (selectedValues.length === bookCovers.length) {
      setisCoverCheckedAll(true)
    }
  }

  const handleCoverCheckAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setisCoverCheckedAll(checked)
    if (checked) {
      const allOptions = bookCovers.map((item) => item)
      setSelectedCovers(allOptions)
    } else {
      setSelectedCovers([])
    }
  }

  const handleSortChange = (selectedSort: string | string[]) => {
    setSelectedSort(selectedSort)
    switch (selectedSort) {
      case 'lowest':
        filteredData.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'highest':
        filteredData.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'newest':
      case 'popularity':
        break
    }
  }

  const filteredData =
    (selectedCategories.length === 0 || isCategoryCheckedAll) &&
    (selectedConditions.length === 0 || isConditionCheckedAll) &&
    (selectedCovers.length === 0 || isCoverCheckedAll)
      ? books
      : books.filter(
          (book) =>
            (selectedCategories.length === 0
              ? true
              : book.categories?.some((category) => selectedCategories.indexOf(category.name) >= 0)) &&
            (selectedConditions.length === 0 ? true : selectedConditions.indexOf(book.condition.toString()) >= 0) &&
            (selectedCovers.length === 0 ? true : selectedCovers.indexOf(book.cover.toString()) >= 0)
        )

  return (
    <Stack>
      {/* Filter Section */}
      <Container maxW="container.2xl" p="4" shadow="sm" border="1px" borderColor="gray.200" borderRadius="4px">
        <Flex justify="space-between">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="radio" defaultValue="popularity" value={selectedSort} onChange={handleSortChange}>
                <MenuItemOption value="popularity">Popularity</MenuItemOption>
                <MenuItemOption value="lowest">Price - Lowest</MenuItemOption>
                <MenuItemOption value="highest">Price - Highest</MenuItemOption>
                <MenuItemOption value="newest">Newest</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Flex>
            <Menu closeOnSelect={false}>
              <MenuButton variant={'outline'} as={Button} rightIcon={<ChevronDownIcon />}>
                Category
              </MenuButton>
              <MenuList>
                <MenuOptionGroup type="checkbox" value={selectedCategories} onChange={handleCategoryChange}>
                  <Checkbox
                    ml="3"
                    defaultChecked
                    isChecked={isCategoryCheckedAll}
                    onChange={handleCategoryCheckAllChanged}
                  >
                    All
                  </Checkbox>
                  {categories.map((category: IMockCategory, indexCategory: number) => (
                    <MenuItemOption value={category.name} key={indexCategory}>
                      {category.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Box w="4" />
            <Menu closeOnSelect={false}>
              <MenuButton variant={'outline'} as={Button} rightIcon={<ChevronDownIcon />}>
                Condition
              </MenuButton>
              <MenuList>
                <MenuOptionGroup type="checkbox" value={selectedConditions} onChange={handleConditionChange}>
                  <Checkbox
                    ml="3"
                    defaultChecked
                    isChecked={isConditionCheckedAll}
                    onChange={handleConditionCheckAllChanged}
                  >
                    All
                  </Checkbox>
                  {bookConditions.map((condition: string, indexCondition: number) => (
                    <MenuItemOption value={condition} key={indexCondition}>
                      {condition}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Box w="4" />
            <Menu closeOnSelect={false}>
              <MenuButton variant={'outline'} as={Button} rightIcon={<ChevronDownIcon />}>
                Cover
              </MenuButton>
              <MenuList>
                <MenuOptionGroup type="checkbox" value={selectedCovers} onChange={handleCoverChange}>
                  <Checkbox ml="3" defaultChecked isChecked={isCoverCheckedAll} onChange={handleCoverCheckAllChanged}>
                    All
                  </Checkbox>
                  {bookCovers.map((cover: string, indexCover: number) => (
                    <MenuItemOption value={cover} key={indexCover}>
                      {cover}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
      {/* BookList Section */}
      {filteredData.length > 0 ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          <React.Fragment>
            {filteredData.map((book: IMockBook, indexBook: number) => (
              <BookCard {...book} key={indexBook} />
            ))}
          </React.Fragment>
        </Grid>
      ) : (
        <Center>
          <Text>No book available!</Text>
        </Center>
      )}
      <Center mt={8}>
        <Pagination
          pagination={{ pageIndex: 1, tableLength: listLength, gotoPage: () => {} }}
          showPageSize={false}
          pageSize={pageSize}
        />
      </Center>
    </Stack>
  )
}

export default BookList
