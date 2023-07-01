import { Divider, Text, Stack } from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import NextLink from 'components/NextLink'
import { IMockBook, mockBooks, mockCategories } from 'components/BookList/components/BookCard/mockData'
import CategoriesList from 'components/BookList/components/CategoriesList'
import BookList from 'components/BookList'

export interface IBookListProps {
  books: IMockBook[]
  pageSize: number
  listLength: number
  showGoToPage?: boolean
}

const LandingPage = () => {
  const categories = getValidArray(mockCategories)
  const books = mockBooks

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

      {/* Book List Section */}
      <BookList books={[...books]} pageSize={12} listLength={books.length} />
    </Stack>
  )
}

export default LandingPage
