import CMSLayout from 'components/Layout/CMSLayout'
import BookDetail from 'components/pages/CMS/BookManagement/Book/BookDetail'

const BookDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <BookDetail />
    </CMSLayout>
  )
}

export default BookDetailPage
