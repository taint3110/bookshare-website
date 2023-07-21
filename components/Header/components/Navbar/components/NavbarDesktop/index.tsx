import { ChevronDownIcon, ChevronUpIcon, Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { PLATFORM } from 'API/constants'
import { NavLink } from 'enums/theme'
import { useStores } from 'hooks/useStores'
import { INavLink, INavLinkItem } from 'interfaces/navigation'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getValidArray } from 'utils/common'
import { backgroundItemHeaderHover } from '../../constants'
import { Button, Container, DropdownButton, Link, Text } from './navbarDesktop.styles'

interface INavbarDesktopProps {
  navLinks: INavLink[]
}

const NavbarDesktop = (props: INavbarDesktopProps) => {
  const [name, setName] = useState<string>('')
  const { websiteBookStore, authStore } = useStores()
  const { navLinks } = props
  const router = useRouter()

  const changeName = useCallback(
    debounce((event: { target: { value: string } }) => {
      setName(event?.target?.value ?? '')
    }, 1000),
    []
  )

  useEffect(() => {
    websiteBookStore.setTitleFilter(name)
  }, [name])

  return (
    <Container>
      <InputGroup ml={40} mr={40}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="ie: ShakeSpear, doraemon,..."
          _placeholder={{ opacity: 1, color: 'gray.500' }}
          bgColor={'white'}
          onChange={changeName}
        />
      </InputGroup>
      {getValidArray(navLinks).map((navLink: INavLink, index: number) => {
        if (navLink.type === NavLink.DROPDOWN) {
          return (
            <Menu computePositionOnMount strategy="fixed" key={index}>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={DropdownButton}
                    transition="all 0.3s"
                    _hover={{ background: 'teal.800', color: 'teal.50' }}
                    _expanded={{ background: 'teal.800', color: 'teal.50' }}
                    _focus={{ boxShadow: 'none' }}
                    rightIcon={
                      isOpen ? (
                        <ChevronUpIcon fontSize="md" marginLeft={1} />
                      ) : (
                        <ChevronDownIcon fontSize="md" marginLeft={1} />
                      )
                    }
                  >
                    {navLink.text}
                  </MenuButton>
                  <MenuList background="background.primary" border="none" color="teal.50" minWidth="150px">
                    {navLink.items?.map((item: INavLinkItem) => (
                      <MenuItem
                        key={item.text}
                        _focus={{ background: backgroundItemHeaderHover }}
                        _active={{ background: backgroundItemHeaderHover }}
                      >
                        <Link
                          href={item.link ?? ''}
                          isExternal={item.internal ? false : true}
                          flex={1}
                          _active={{ boxShadow: 'none' }}
                        >
                          {item.text}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          )
        }
        if (navLink.type === NavLink.EMPTY_DROPDOWN) {
          return (
            <Link href={navLink?.link ?? ''} key={`navbar-item${index}`}>
              <DropdownButton
                transition="all 0.3s"
                _hover={{ background: 'teal.800', color: 'teal.50' }}
                _expanded={{ background: 'teal.800', color: 'teal.50' }}
                _focus={{ boxShadow: 'none' }}
              >
                {navLink.text}
              </DropdownButton>
            </Link>
          )
        }
        return (
          <Link
            href={navLink?.link !== '/' ? navLink?.link : undefined}
            onClick={() => {
              if (navLink?.link === '/') {
                authStore.clearAccessToken(PLATFORM.WEBSITE)
                toast.success('Logged out successfully.')
              }
            }}
            key={`navbar-item${index}`}
            isExternal
          >
            {navLink.type === NavLink.LINK ? (
              <Text>{navLink.text}</Text>
            ) : (
              navLink.type === NavLink.BUTTON && (
                <Button lineHeight={5} fontSize="sm">
                  {navLink.text}
                </Button>
              )
            )}
          </Link>
        )
      })}
    </Container>
  )
}

export default observer(NavbarDesktop)
