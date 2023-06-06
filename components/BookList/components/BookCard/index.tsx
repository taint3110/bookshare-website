import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button, ButtonGroup, Divider, Heading } from '@chakra-ui/react'

export interface IMockBook {
    title?: string
    author?: string[]
    price?: number
    bonusPointPrice?: number
    bookStatus?: string
    bookImages?: string
}

const BookCard = (props: IMockBook) => {
  const { title, author, price, bonusPointPrice, bookStatus, bookImages } = props
    return (      
        <Card maxW='sm'>
        <CardBody>
            <Image
            src={bookImages}
            alt={title}
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text>{author}</Text>
            <Text color='teal.600' fontSize='2xl'>
                {price}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant={bookStatus == 'available' ? 'solid' : 'flushed'}>
                {bookStatus == 'available' ? 'Add to cart' : 'Unavailable'}
            </Button>
            <Button variant='ghost'>
                Save
            </Button>
            </ButtonGroup>
        </CardFooter>
        </Card>
    )
}

export default BookCard;