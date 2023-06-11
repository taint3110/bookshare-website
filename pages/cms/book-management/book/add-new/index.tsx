import CMSLayout from 'components/Layout/CMSLayout'
import AddNewBook from 'components/pages/CMS/BookManagement/Book/AddNewBook'

const HouseDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <AddNewBook />
    </CMSLayout>
  )
}

export default HouseDetailPage
