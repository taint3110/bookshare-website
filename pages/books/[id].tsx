import { mockBooks } from 'components/BookList/components/BookCard/mockData'
import MainLayout from 'components/Layout/MainLayout'
import BookDetail from 'components/pages/BookDetail'
import { useRouter } from 'next/router'
import { getValidArray } from 'utils/common'

function getBookByid(id: number | null) {
  if (id) return getValidArray(mockBooks)[id]
}

function BookPage() {
  const router = useRouter()
  const { id } = router.query

  return <MainLayout title="BookShare | Book detail"></MainLayout>
}

export default BookPage
