import React, { Fragment } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  VStack,
  Text as CkText,
  Link,
  Button as CkButton
} from '@chakra-ui/react'
import { NavLink } from 'enums/theme'
import { INavLink, INavLinkItem } from 'interfaces/navigation'
import { getValidArray } from 'utils/common'
import { Flex, Box, Text, Button, DrawerCloseButton } from './navbarMobile.styles'

interface INavbarMobileProps {
  isOpen: boolean
  toggle: () => void
  navLinks: INavLink[]
}

const NavbarMobile = (props: INavbarMobileProps) => {
  const { isOpen, toggle, navLinks } = props

  return (
    <Drawer isOpen={isOpen} onClose={toggle} size="sm" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Flex overflowY="auto" as="nav" background="background.primary" padding={0}>
          <Box padding={0}>
            <Accordion defaultIndex={0} allowToggle>
              {getValidArray(navLinks).map((navLink: INavLink, index: number) => {
                if (navLink.type === NavLink.DROPDOWN) {
                  return (
                    <Fragment key={`dropdown-mobile-item${index}`}>
                      <AccordionItem border="none">
                        <AccordionButton
                          key={index}
                          height={16}
                          paddingX={8}
                          paddingY={5}
                          justifyContent="space-between"
                          _hover={{ background: 'transparent' }}
                          _expanded={{ background: 'transparent' }}
                          _focus={{ boxShadow: 'none' }}
                        >
                          <CkText fontSize="md" lineHeight={6} fontWeight="semibold" color="teal.50" margin={0}>
                            {navLink.text}
                          </CkText>
                          <AccordionIcon color="gray.50" fontSize="md" />
                        </AccordionButton>
                        <AccordionPanel padding={0}>
                          <VStack
                            background="rgba(49, 151, 149, 0.15)"
                            border="none"
                            spacing={6}
                            alignItems="flex-start"
                            paddingY={5}
                            paddingX={8}
                          >
                            {navLink.items?.map((item: INavLinkItem) => (
                              <Text key={item.text} isDropdownItem>
                                <Link
                                  display="block"
                                  href={item.link ?? ''}
                                  onClick={() => toggle()}
                                  isExternal={item.internal ? false : true}
                                  _active={{ boxShadow: 'none' }}
                                >
                                  {item.text}
                                </Link>
                              </Text>
                            ))}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Fragment>
                  )
                }
                if (navLink.type === NavLink.EMPTY_DROPDOWN) {
                  return (
                    <CkButton
                      key={index}
                      height={16}
                      paddingX={8}
                      paddingY={5}
                      justifyContent="space-between"
                      background="transparent"
                      width="100%"
                      _hover={{ background: 'transparent' }}
                      _expanded={{ background: 'transparent' }}
                      _focus={{ boxShadow: 'none' }}
                    >
                      <Link href={navLink?.link ?? ''} key={`navbar-item${index}`}>
                        <CkText fontSize="md" lineHeight={6} fontWeight="semibold" color="teal.50" margin={0}>
                          {navLink.text}
                        </CkText>
                      </Link>
                    </CkButton>
                  )
                }
                return (
                  <Link href={navLink?.link ?? ''} key={index} isExternal>
                    {navLink.type === NavLink.LINK ? (
                      <Text hasBorder={index === navLinks.length - 2 ? false : true}>{navLink.text}</Text>
                    ) : (
                      navLink.type === NavLink.BUTTON && (
                        <Button alignItems="center" marginLeft={8} marginY={6}>
                          <CkText color="black" lineHeight={7} fontSize="18px">
                            {navLink.text}
                          </CkText>
                        </Button>
                      )
                    )}
                  </Link>
                )
              })}
            </Accordion>
          </Box>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default NavbarMobile
