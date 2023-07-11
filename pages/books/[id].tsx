import { Text } from '@chakra-ui/react'
import {
  EBookConditionEnum,
  EBookCoverEnum,
  IMockBook,
  mockBooks
} from 'components/BookList/components/BookCard/mockData'
import MainLayout from 'components/Layout/MainLayout'
import BookDetail from 'components/pages/BookDetail'

function BookPage() {
  return (
    <MainLayout title="BookShare | Book detail">
      <BookDetail />
    </MainLayout>
  )
}

export default BookPage
