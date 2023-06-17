import BookList from 'components/BookList'
import BookCard from 'components/BookList/components/BookCard'
import { mockBooks } from 'components/BookList/components/BookCard/mockData'
import MainLayout from 'components/Layout/MainLayout'
import { getValidArray } from 'utils/common'

const books = mockBooks

const ListPage = () => {
  return (
    <MainLayout title="BookShare | Landing Page">
      <BookList books={[...books]} />
    </MainLayout>
  )
}

export default ListPage

// export async function getServerSideProps(context: { query: any }) {
//   try {
//     // TODO: May use later
//     return {}
//   } catch (error) {
//     console.log('listing-page: getServerSideProps -> error', error)
//     return {}
//   }
// }
