import CMSLayout from 'components/Layout/CMSLayout'
import SeriesDetail from 'components/pages/CMS/BookManagement/Series/SeriesDetail'

const SeriesDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <SeriesDetail />
    </CMSLayout>
  )
}

export default SeriesDetailPage
