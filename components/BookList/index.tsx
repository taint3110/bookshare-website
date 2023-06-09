import { useState } from 'react'
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack
} from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import { IMockBook, IMockCategory, mockBooks, mockCategories } from './components/BookCard/mockData'
import BookFilter from './components/BookFilters'
import BookCard from './components/BookCard'
import { ChevronDownIcon } from '@chakra-ui/icons'

const BookList = ({ books }: { books: IMockBook[] }) => {
  const [selectedFilters, setSelectedFilters] = useState([])
  const handleFilterChange = (selectedValues: string[]) => {
    setSelectedFilters(selectedValues)
  }

  const filteredData = books.map((book) => book.categories?.some((category) => selectedFilters.indexOf(category) >= 0))

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
              <MenuOptionGroup
                type="radio"
                defaultValue="popularity"
                value={selectedFilters}
                onChange={handleFilterChange}
              >
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
              <MenuOptionGroup type="checkbox">
                {getValidArray(mockCategories).map((category: IMockCategory, indexCategory: number) => (
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
        {books.map((book: IMockBook, indexBook: number) => (
          <BookCard {...book} key={indexBook} />
        ))}
      </Grid>
    </Stack>
  )
}

export default BookList
