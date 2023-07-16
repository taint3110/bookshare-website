import { Card, CardBody, Divider, Grid, Link, Stack, Text, Image, Button } from '@chakra-ui/react'
import BookList from 'components/BookList'
import CategoriesList from 'components/BookList/components/CategoriesList'
import NextLink from 'components/NextLink'
import { IBookWithRelations } from 'interfaces/book'
import { ICategory } from 'interfaces/category'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { maxMobileWidth, maxTabletWidth } from 'theme/globalStyles'
import { getValidArray } from 'utils/common'

export interface IBookListProps {
  books: IBookWithRelations[]
  pageSize: number
  listLength: number
  showGoToPage?: boolean
}

export interface ILandingPageProps {
  bookList: IBookWithRelations[]
  countBookList: number
  categoryList: ICategory[]
}

const LandingPage = (props: ILandingPageProps) => {
  const { bookList, countBookList, categoryList } = props
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth })
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })

  useEffect(() => {
    setIsCollapsed(isMobile || isTabletMobile)
  }, [isMobile, isTabletMobile])

  if (isCollapsed) {
    return (
      <Stack paddingLeft="20px" paddingRight="20px" marginTop="4" marginBottom="40">
        <Text fontSize="sm">Choose your favorite books, and pick them up at our store at:</Text>
        <NextLink href="https://goo.gl/maps/5qzXdqKS7sTeToJy5">
          <Text color={'teal.600'}>BookShare, Prairie Village, KS 66208, United States</Text>
        </NextLink>
        <Divider m="4" />
        {/* Book List Section */}
        <BookList bookList={bookList} categoryList={categoryList} countBookList={countBookList} gridColumns={2} />
      </Stack>
    )
  }
  return (
    <Stack paddingLeft="200px" paddingRight="200px" marginTop="4" marginBottom="40">
      <Text fontSize="sm">Choose your favorite books, and pick them up at our store at:</Text>
      <NextLink href="https://goo.gl/maps/5qzXdqKS7sTeToJy5">
        <Text color={'teal.600'}>BookShare, Prairie Village, KS 66208, United States</Text>
      </NextLink>
      <Divider m="4" />
      {/* Book List Section */}
      <BookList bookList={bookList} categoryList={categoryList} countBookList={countBookList} gridColumns={4} />
    </Stack>
  )
}

export default LandingPage
