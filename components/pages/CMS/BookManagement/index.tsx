import Tabs, { ITabData } from 'components/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import routes from 'routes'
import { getQueryValue } from 'utils/common'
import BookList from './BookList'

const BookManagement = () => {
  const router = useRouter()
  const tabNumber: number = getQueryValue(router, 'index', 0)
  const [tabIndex, setTabIndex] = useState(tabNumber)
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
    // INFO
    // {
    //   label: 'Book',
    //   content: <BookList />
    // },
    // {
    //   label: 'Series',
    //   content: <SeriesList />
    // },
    // {
    //   label: 'Category',
    //   content: <CategoryList />
    // }
  ]
  return <Tabs data={tabsData} tabIndex={tabIndex} onChange={changeIndex} />
}

export default BookManagement
