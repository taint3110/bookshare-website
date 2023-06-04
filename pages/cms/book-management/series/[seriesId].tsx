import CMSLayout from 'components/Layout/CMSLayout'
import RoomDetail from 'components/pages/CMS/PropertyManagement/RoomManagement/RoomDetail'

const RoomDetailPage = () => {
  return (
    <CMSLayout title={`Book Management | Internal Portal`} topBarTitle="Book Management">
      <RoomDetail />
    </CMSLayout>
  )
}

export default RoomDetailPage
