import { Container, Divider, HStack, Stack } from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import { IMockBook, mockBooks } from './components/BookCard/mockData'
import BookFilter from './components/BookFilters'
import BookCard from './components/BookCard'

const BookList = ({ books }: { books: IMockBook[] }) => {
  return (
    <Stack pl="200px" pr="200px" mt="4" mb="40">
      <BookFilter></BookFilter>
      <Divider m="4" />
      <HStack spacing={12}>
        {books.map((book: IMockBook, indexBook: number) => (
          <BookCard {...book} key={indexBook} />
        ))}
      </HStack>
    </Stack>
  )
}

export default BookList
