import { Card, CardBody, Grid, Heading, Stack, Image, Text } from '@chakra-ui/react'
import { IMockCategory } from '../BookCard/mockData'
import { Label } from 'components/IconWithText/iconWithText.styles'

const CategoriesList = ({ categories }: { categories: IMockCategory[] }) => {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={1}>
      {categories.map((category: IMockCategory, categoryIndex: number) => (
        <a href="/">
          <Card maxW="sm" key={categoryIndex}>
            <CardBody>
              <Image src={category.image} alt={category.name} borderRadius="lg" />
              <Text align={'center'} size="md" mt={4}>
                {category.name.toUpperCase()}
              </Text>
            </CardBody>
          </Card>
        </a>
      ))}
    </Grid>
  )
}

export default CategoriesList
