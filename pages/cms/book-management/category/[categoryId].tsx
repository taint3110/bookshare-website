import CMSLayout from 'components/Layout/CMSLayout'
import CategoryDetail from 'components/pages/CMS/BookManagement/Category/CategoryDetail'

const SeriesDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <CategoryDetail />
    </CMSLayout>
  )
}

export default SeriesDetailPage
