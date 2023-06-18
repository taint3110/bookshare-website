import { useState } from 'react'
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
import CategoriesList from './components/CategoriesList'
import NextLink from 'components/NextLink'
import Pagination from 'components/BookList/components/Pagination'

const BookList = ({ books }: { books: IMockBook[] }) => {
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
            book.categories?.some((category) => selectedCategories.indexOf(category.name) >= 0) &&
            selectedConditions.indexOf(book.condition.toString()) >= 0 &&
            selectedCovers.indexOf(book.cover.toString()) >= 0
        )

  return (
    <Stack pl="200px" pr="200px" mt="4" mb="40">
      <Text fontSize="sm">Choose your favorite books, and pick them up at our store at:</Text>
      <NextLink href="https://goo.gl/maps/5qzXdqKS7sTeToJy5">
        <Text color={'teal.600'}>BookShare, Prairie Village, KS 66208, United States</Text>
      </NextLink>
      <Divider m="4" />

      {/* Categories Section */}
      <CategoriesList categories={categories} />
      <Divider m="4" />

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
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {filteredData.map((book: IMockBook, indexBook: number) => (
          <a href="/">
            <BookCard {...book} key={indexBook} />
          </a>
        ))}
      </Grid>
      <Center mt={8}>
        <Pagination
          pagination={{ pageIndex: 1, tableLength: books.length, gotoPage: () => {} }}
          showPageSize={false}
          pageSize={12}
        />
      </Center>
    </Stack>
  )
}

export default BookList
