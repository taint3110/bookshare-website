import Tabs, { ITabData } from 'components/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import routes from 'routes'
import { getQueryValue } from 'utils/common'

import dynamic from 'next/dynamic'
const OrderList = dynamic(() => import('./Order/OrderList'), { ssr: false })

const OrderManagement = () => {
  const router = useRouter()
  const tabNumber: number = getQueryValue(router, 'index', 0)
  const [tabIndex, setTabIndex] = useState<number>(tabNumber)
  const { query, isReady } = router
  const { index: pageIndex } = query

  function changeIndex(index: number) {
    setTabIndex(index)
    router.replace(`${routes.cms.bookManagement.value}?index=${index}&page=1`)
  }

  useEffect(() => {
    if (Number(pageIndex) > 0 && isReady) {
      setTabIndex(Number(pageIndex))
    }
  }, [pageIndex, isReady])

  const tabsData: ITabData[] = [
    {
      label: 'Order',
      content: <OrderList />
    }
  ]
  return <Tabs data={tabsData} tabIndex={tabIndex} onChange={changeIndex} />
}

export default OrderManagement
