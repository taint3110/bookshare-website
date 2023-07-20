import { getCMSBooks } from 'API/cms/book'
import { getCMSCategory } from 'API/cms/category'
import MainLayout from 'components/Layout/MainLayout'
import LandingPage from 'components/pages/LandingPage'
import { useStores } from 'hooks/useStores'
import { IBook } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getValidArray } from 'utils/common'

interface IListingPageProps {
  bookList: IBook[]
  countBookList: number
  categoryList: ICategory[]
}

const ListPage = (props: IListingPageProps) => {
  const { bookList, countBookList, categoryList } = props
  const { websiteBookStore } = useStores()
  const router = useRouter()

  const { titleFilter } = websiteBookStore
  useEffect(() => {
    if (titleFilter) {
      router.push({
        query: {
          titleFilter: titleFilter
        }
      })
    } else {
      router.push({
        query: {}
      })
    }
  }, [titleFilter])

  return (
    <MainLayout title="BookShare | Landing Page">
      <LandingPage bookList={bookList} categoryList={categoryList} countBookList={countBookList} />
    </MainLayout>
  )
}

export default observer(ListPage)

export async function getServerSideProps(context: { query: any }) {
  try {
    const [bookList, categoryList] = await Promise.all([
      getCMSBooks({
        include: ['media'],
        where: {
          title: context?.query?.titleFilter ?? ''
        }
      }),
      getCMSCategory({
        include: ['media']
      })
    ])
    return {
      props: {
        bookList: getValidArray(bookList?.results),
        countBookList: bookList?.totalCount ?? 0,
        categoryList
      }
    }
  } catch (error) {
    console.log('listing-page: getServerSideProps -> error', error)
    return {
      props: { bookList: [], countBookList: 0, categoryList: {}, metroList: [], isEntireHouse: false }
    }
  }
}
