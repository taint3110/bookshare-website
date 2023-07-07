import CMSLayout from 'components/Layout/CMSLayout'
import dynamic from 'next/dynamic'
const OrderDetail = dynamic(() => import('components/pages/CMS/OrderManagement/Order/OrderDetail'), { ssr: false })

const OrderDetailPage = () => {
  return (
    <CMSLayout title={`Order Management | Internal Portal`} topBarTitle="Order Management">
      <OrderDetail />
    </CMSLayout>
  )
}

export default OrderDetailPage
