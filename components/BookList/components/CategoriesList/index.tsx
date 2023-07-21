import { Card, CardBody, Grid, Image, Text } from '@chakra-ui/react'
import { ICategory } from 'interfaces/category'
import { observer } from 'mobx-react'
import Link from 'next/link'
import { getValidArray } from 'utils/common'

export interface ICategoriesListProps {
  categories: ICategory[]
}

const CategoriesList = (props: ICategoriesListProps) => {
  const { categories } = props
  return (
    <Grid templateColumns={{ base: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={1}>
      {getValidArray(categories).map((category: ICategory, categoryIndex: number) => (
        <Link href="/" key={category?.id}>
          <Card maxW="sm" key={categoryIndex}>
            <CardBody>
              <Image
                boxSize={'200'}
                objectFit="cover"
                src={category?.media?.imageUrl ?? 'https://via.placeholder.com/150'}
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

export default observer(CategoriesList)
