import CMSLayout from 'components/Layout/CMSLayout'
import AddNewSeries from 'components/pages/CMS/BookManagement/Series/AddNewSeries'

const HouseDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <AddNewSeries />
    </CMSLayout>
  )
}

export default HouseDetailPage
