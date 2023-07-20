import { Stack, Text, Grid, Center } from '@chakra-ui/react'
import BookCard from 'components/BookList/components/BookCard'
import { IMockCategory, IMockBook } from 'components/BookList/components/BookCard/mockData'
import Pagination from 'components/BookList/components/Pagination'
import { IBookWithRelations } from 'interfaces/book'
import { observer } from 'mobx-react'
import React from 'react'

export interface IBookWithRelationsListProps {
  bookList: IBookWithRelations[]
  countBookList: number
  gridColumns: number
}

const BookListNoFilter = (props: IBookWithRelationsListProps) => {
  const { bookList, countBookList, gridColumns } = props
  return (
    <Stack>
      {/* BookList Section */}
      {Array.isArray(bookList) && bookList.length > 0 ? (
        <Grid templateColumns={'repeat(' + gridColumns + ', 1fr)'} gap={2}>
          {bookList.map((book: IBookWithRelations, indexBook: number) => (
            <BookCard {...book} key={indexBook} />
          ))}
        </Grid>
      ) : (
        <Center>
          <Text>No book available!</Text>
        </Center>
      )}
    </Stack>
  )
}

export default observer(BookListNoFilter)
