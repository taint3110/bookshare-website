import { getCMSBooks } from 'API/cms/book'
import { getCMSCategory } from 'API/cms/category'
import BookList from 'components/BookList'
import MainLayout from 'components/Layout/MainLayout'
import LandingPage from 'components/pages/LandingPage'
import { IBook } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { getValidArray } from 'utils/common'

interface IListingPageProps {
  bookList: IBook[]
  countBookList: number
  categoryList: ICategory[]
}

const ListPage = (props: IListingPageProps) => {
  const { bookList, countBookList, categoryList } = props
  return (
    <MainLayout title="BookShare | Landing Page">
      <LandingPage />
      <BookList bookList={bookList} categoryList={categoryList} countBookList={countBookList} />
    </MainLayout>
  )
}

export default ListPage

export async function getServerSideProps(context: { query: any }) {
  try {
    const [bookList, categoryList] = await Promise.all([getCMSBooks({}), getCMSCategory({})])

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
