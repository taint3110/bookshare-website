import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup
} from '@chakra-ui/react'
import { getValidArray } from 'utils/common'
import { IMockCategory, mockCategories } from '../BookCard/mockData'
import { observer } from 'mobx-react'

const BookFilter = () => {
  return (
    <Container maxW="container.2xl" p="4" shadow="sm" border="1px" borderColor="gray.200" borderRadius="4px">
      <Flex justify="space-between">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sort by
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="radio" defaultValue="popularity">
              <MenuItemOption value="popularity">Popularity</MenuItemOption>
              <MenuItemOption value="lowest">Price - Lowest</MenuItemOption>
              <MenuItemOption value="highest">Price - Highest</MenuItemOption>
              <MenuItemOption value="newest">Newest</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Category
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="checkbox">
              {getValidArray(mockCategories).map((category: IMockCategory, indexCategory: number) => (
                <MenuItemOption value={category.name} key={indexCategory}>
                  {category.name}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  )
}

export default observer(BookFilter)
