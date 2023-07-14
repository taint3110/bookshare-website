import { Stack, Text, Grid, Center } from '@chakra-ui/react'
import BookCard from 'components/BookList/components/BookCard'
import { IMockCategory, IMockBook } from 'components/BookList/components/BookCard/mockData'
import Pagination from 'components/BookList/components/Pagination'
import { IBookListProps } from 'components/pages/LandingPage'
import { IBookWithRelations } from 'interfaces/book'
import React from 'react'

const BookListNoFilter = (props: IBookListProps) => {
  const { books, pageSize = 12, listLength, showGoToPage = false } = props
  return (
    <Stack>
      {/* BookList Section */}
      {books.length > 0 ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          <React.Fragment>
            {books.map((book: IBookWithRelations, indexBook: number) => (
              <BookCard {...book} key={indexBook} />
            ))}
          </React.Fragment>
        </Grid>
      ) : (
        <Center>
          <Text>No book available!</Text>
        </Center>
      )}
      <Center mt={8}>
        <Pagination
          pagination={{ pageIndex: 1, tableLength: listLength, gotoPage: () => {} }}
          showPageSize={false}
          pageSize={pageSize}
        />
      </Center>
    </Stack>
  )
}

export default BookListNoFilter
