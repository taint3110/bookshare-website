import React, { isValidElement, ReactElement } from 'react'
import { Flex, HStack, Spacer } from '@chakra-ui/react'

export const Template: React.FC = (props) => {
  const children = React.Children.toArray(props.children).filter<ReactElement>(isValidElement)
  return (
    <Flex
      paddingY="12px"
      paddingX={{ base: 4, md: 6, lg: 8 }}
      background="white"
      boxShadow="base"
      borderBottomWidth="none"
      justifyContent="space-between"
    >
      {children.find((child) => child.type === Hamburger)?.props.children}

      <HStack spacing={3} display="flex">
        {children.find((child) => child.type === Title)?.props.children}
      </HStack>
      <Spacer display={{ base: 'none', md: 'flex' }} />
      <HStack display="flex" spacing={3}>
        {children.find((child) => child.type === UserProfile)?.props.children}
      </HStack>
    </Flex>
  )
}

const Hamburger: React.FC = () => null
const Title: React.FC = () => null
const UserProfile: React.FC = () => null

const Navbar = Object.assign(Template, { Hamburger, Title, UserProfile })

export default Navbar
