import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Button,
  ButtonGroup,
  Divider,
  Heading
} from '@chakra-ui/react'
import { IMockBook } from './mockData'

const BookCard = (props: IMockBook) => {
  const { title, author, price, bonusPointPrice, bookStatus, bookImages } = props
  return (
    <Card>
      <CardBody>
        <Image src={bookImages} boxSize="sm" objectFit="contain" alt={title} borderRadius="sm" />
        <Stack mt="4" spacing="1">
          <Heading size="sm">{title}</Heading>
          <Text>{author}</Text>
          <Text color="teal.600" fontSize="xl">
            {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="1">
          <Button
            variant={bookStatus == 'available' ? 'solid' : 'flushed'}
            isDisabled={bookStatus == 'available' ? false : true}
          >
            {bookStatus == 'available' ? 'Add to cart' : 'Unavailable'}
          </Button>
          <Button variant="ghost">Save</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default BookCard
