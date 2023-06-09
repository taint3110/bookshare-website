import { useState } from 'react'
import {
  Button,
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
  Stack
} from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import { IMockBook, IMockCategory, mockCategories } from './components/BookCard/mockData'
import BookCard from './components/BookCard'
import { ChevronDownIcon } from '@chakra-ui/icons'

const BookList = ({ books }: { books: IMockBook[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<string | string[]>([])
  const [isFilterCheckedAll, setisFilterCheckedAll] = useState<boolean>()
  const categories = getValidArray(mockCategories)
  // isFilterCheckedAll = true

  const handleFilterChange = (selectedValues: string | string[]) => {
    setSelectedFilters(selectedValues)
    if (selectedValues.length < categories.length) {
      setisFilterCheckedAll(false)
    } else if (selectedValues.length === categories.length) {
      setisFilterCheckedAll(true)
    }
  }

  const handleCheckAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setisFilterCheckedAll(checked)
    if (checked) {
      const allOptions = categories.map((item) => item.name)
      setSelectedFilters(allOptions)
    } else {
      setSelectedFilters([])
    }
  }

  const filteredData = isFilterCheckedAll
    ? books
    : books.filter((book) => book.categories?.some((category) => selectedFilters.indexOf(category.name) >= 0))

  return (
    <Stack pl="200px" pr="200px" mt="4" mb="40">
      {/* Filter Section */}
      <Container maxW="container.2xl" p="4" shadow="sm" border="1px" borderColor="gray.200" borderRadius="4px">
        <Flex justify="space-between">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="radio" defaultValue="popularity">
                <MenuItemOption value="popularity">Popularity</MenuItemOption>
                <MenuItemOption value="lowest">Price - Lowest</MenuItemOption>
                <MenuItemOption value="highest">Price - Highest</MenuItemOption>
                <MenuItemOption value="newest">Newest</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Category
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="checkbox" value={selectedFilters} onChange={handleFilterChange}>
                <Checkbox ml="3" defaultChecked isChecked={isFilterCheckedAll} onChange={handleCheckAllChanged}>
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
        </Flex>
      </Container>
      <Divider m="4" />

      {/* BookList Section */}
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {filteredData.map((book: IMockBook, indexBook: number) => (
          <BookCard {...book} key={indexBook} />
        ))}
      </Grid>
    </Stack>
  )
}

export default BookList
