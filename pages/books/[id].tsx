import {
  EBookConditionEnum,
  EBookCoverEnum,
  IMockBook,
  mockBooks
} from 'components/BookList/components/BookCard/mockData'
import MainLayout from 'components/Layout/MainLayout'
import BookDetail from 'components/pages/BookDetail'
import { useRouter } from 'next/router'
import { getValidArray } from 'utils/common'

function getBookByid(id: number): IMockBook {
  return getValidArray(mockBooks)[id]
}

function BookPage() {
  const router = useRouter()
  const { id } = router.query
  if (id)
    return (
      <MainLayout title="BookShare | Book detail">
        <BookDetail {...getBookByid(+id)} />
      </MainLayout>
    )
}

export default BookPage
