import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import * as React from 'react'
import Navbar from './components/Navbar'
import UserProfile from './components/UserProfile'

interface ITopBarProps {
  isCollapsedSidebar: boolean
  setIsCollapsedSidebar: (newIsCollapsed: boolean) => void
  title: string
}

const TopBar = ({ isCollapsedSidebar, setIsCollapsedSidebar, title }: ITopBarProps) => {
  function toggleSideBar() {
    setIsCollapsedSidebar(!isCollapsedSidebar)
  }

  return (
    <Box
      height="72px"
      position={{ base: 'static', md: 'fixed' }}
      left={isCollapsedSidebar ? '80px' : '320px'}
      right="0"
      zIndex={1000}
    >
      <Navbar>
        <Navbar.Hamburger>
          <Center marginEnd={2} onClick={toggleSideBar} paddingY={1}>
            <IconButton
              display="flex"
              size="md"
              aria-label="Open menu"
              fontSize="24px"
              variant="ghost"
              opacity="0.8"
              icon={<HamburgerIcon />}
            />
          </Center>
        </Navbar.Hamburger>
        <Navbar.Title>
          <Center>
            <Text fontSize="xl" fontWeight="600">
              {title}
            </Text>
          </Center>
        </Navbar.Title>
        <Navbar.UserProfile>
          <UserProfile />
        </Navbar.UserProfile>
      </Navbar>
    </Box>
  )
}

export default TopBar
