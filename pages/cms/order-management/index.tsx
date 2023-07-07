import CMSLayout from 'components/Layout/CMSLayout'
import OrderManagement from 'components/pages/CMS/OrderManagement'

const OrderManagementPage = () => {
  return (
    <CMSLayout title={`Order Management | Internal Portal`} topBarTitle="Order Management">
      <OrderManagement />
    </CMSLayout>
  )
}

export default OrderManagementPage
