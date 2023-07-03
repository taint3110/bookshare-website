import { Divider, Stack, Text } from '@chakra-ui/react'
import BookList from 'components/BookList'
import { IMockBook } from 'components/BookList/components/BookCard/mockData'
import CategoriesList from 'components/BookList/components/CategoriesList'
import NextLink from 'components/NextLink'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'

export interface IBookListProps {
  books: IMockBook[]
  pageSize: number
  listLength: number
  showGoToPage?: boolean
}

export interface ILandingPageProps {
  bookList: IBookWithRelations[]
  countBookList: number
  categoryList: ICategory[]
}

const LandingPage = (props: ILandingPageProps) => {
  const { bookList, countBookList, categoryList } = props

  return (
    <Stack pl="200px" pr="200px" mt="4" mb="40">
      <Text fontSize="sm">Choose your favorite books, and pick them up at our store at:</Text>
      <NextLink href="https://goo.gl/maps/5qzXdqKS7sTeToJy5">
        <Text color={'teal.600'}>BookShare, Prairie Village, KS 66208, United States</Text>
      </NextLink>
      <Divider m="4" />

      {/* Categories Section */}
      <CategoriesList categories={categoryList} />
      <Divider m="4" />

      {/* Book List Section */}
      <BookList bookList={bookList} categoryList={categoryList} countBookList={countBookList} />
    </Stack>
  )
}

export default LandingPage
