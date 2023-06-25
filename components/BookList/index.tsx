import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import Pagination from 'components/BookList/components/Pagination'
import NextLink from 'components/NextLink'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import Link from 'next/link'
import { useState } from 'react'
import { getValidArray } from 'utils/common'
import BookCard from './components/BookCard'
import { MockBookConditions, MockBookCovers } from './components/BookCard/mockData'
import CategoriesList from './components/CategoriesList'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Pagination from 'components/BookList/components/Pagination'

export interface IBookWithRelationsListProps {
  bookList: IBookWithRelations[]
  countBookList: number
  categoryList: ICategory[]
}

const BookList = (props: IBookWithRelationsListProps) => {
  const { bookList, countBookList, categoryList } = props
  // Filter for categoryList
  const [selectedCategories, setSelectedCategories] = useState<string | string[]>([])
  const [isCategoryCheckedAll, setisCategoryCheckedAll] = useState<boolean>()
  // Filter for condition
  const [selectedConditions, setSelectedConditions] = useState<string | string[]>([])
  const [isConditionCheckedAll, setisConditionCheckedAll] = useState<boolean>()
  // Filter for covers
  const [selectedCovers, setSelectedCovers] = useState<string | string[]>([])
  const [isCoverCheckedAll, setisCoverCheckedAll] = useState<boolean>()

  const [selectedSort, setSelectedSort] = useState<string | string[]>()
  const bookConditions = getValidArray(MockBookConditions)
  const bookCovers = getValidArray(MockBookCovers)

  const handleCategoryChange = (selectedValues: string | string[]) => {
    setSelectedCategories(selectedValues)
    if (selectedValues.length < categoryList.length) {
      setisCategoryCheckedAll(false)
    } else if (selectedValues.length === categoryList.length) {
      setisCategoryCheckedAll(true)
    }
  }

  const handleCategoryCheckAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setisCategoryCheckedAll(checked)
    if (checked) {
      const allOptions: string[] = getValidArray(categoryList).map((item) => item?.name ?? '')
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

  // const filteredData =
  //   (selectedCategories.length === 0 || isCategoryCheckedAll) &&
  //   (selectedConditions.length === 0 || isConditionCheckedAll) &&
  //   (selectedCovers.length === 0 || isCoverCheckedAll)
  //     ? bookList
  //     : bookList.filter(
  //         (book: IBookWithRelations) =>
  //           (selectedCategories.length === 0
  //             ? true
  //             : book?.categories?.some((category) => selectedCategories.indexOf(category?.name) >= 0)) &&
  //           (selectedConditions.length === 0 ? true : selectedConditions.indexOf(book?.bookCondition.toString()) >= 0) &&
  //           (selectedCovers.length === 0 ? true : selectedCovers.indexOf(book?.bookCover.toString()) >= 0)
  //       )

  const filteredData = bookList

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
                  {getValidArray(categoryList).map((category: ICategory, indexCategory: number) => (
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
      {filteredData?.length > 0 ? (
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
          pagination={{ pageIndex: 1, tableLength: countBookList, gotoPage: () => {} }}
          showPageSize={false}
          pageSize={12}
        />
      </Center>
    </Stack>
  )
}

export default BookList
