import { Card, CardBody, Grid, Image, Text } from '@chakra-ui/react'
import { ICategory } from 'interfaces/category'
import Link from 'next/link'
import { getValidArray } from 'utils/common'

export interface ICategoriesListProps {
  categories: ICategory[]
}

const CategoriesList = (props: ICategoriesListProps) => {
  const { categories } = props
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={1}>
      {getValidArray(categories).map((category: ICategory, categoryIndex: number) => (
        <Link href="/" key={category?.id}>
          <Card maxW="sm" key={categoryIndex}>
            <CardBody>
              <Image
                boxSize={'200'}
                objectFit="contain"
                src="https://m.media-amazon.com/images/I/81TkpoPjOyL._AC_UF1000,1000_QL80_.jpg"
                alt={category?.name}
                borderRadius="lg"
              />
              <Text align={'center'} size="md" mt={4}>
                {category?.name && category?.name.toUpperCase()}
              </Text>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Grid>
  )
}

export default CategoriesList
