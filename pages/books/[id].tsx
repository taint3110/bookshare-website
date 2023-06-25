import { Text } from '@chakra-ui/react'
import {
  EBookConditionEnum,
  EBookCoverEnum,
  IMockBook,
  mockBooks
} from 'components/BookList/components/BookCard/mockData'
import MainLayout from 'components/Layout/MainLayout'
import BookDetail from 'components/pages/BookDetail'
import { useRouter } from 'next/router'
import ErrorNotFoundPage from 'pages/404'
import { getValidArray } from 'utils/common'

function getBookById(id: string): IMockBook | any {
  return getValidArray(mockBooks)[+id + 1]
}

function BookPage() {
  const router = useRouter()
  const { id } = router.query
  if (id) {
    const bookData = getBookById(id.toString())
    if (bookData) {
      return (
        <MainLayout title="BookShare | Book detail">
          <BookDetail {...bookData} />
        </MainLayout>
      )
    } else {
      return <ErrorNotFoundPage></ErrorNotFoundPage>
    }
  } else {
    return <ErrorNotFoundPage></ErrorNotFoundPage>
  }
}

export default BookPage
