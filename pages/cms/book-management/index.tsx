import CMSLayout from 'components/Layout/CMSLayout'
import BookManagement from 'components/pages/CMS/BookManagement'

const BookManagementPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <BookManagement />
    </CMSLayout>
  )
}

export default BookManagementPage
