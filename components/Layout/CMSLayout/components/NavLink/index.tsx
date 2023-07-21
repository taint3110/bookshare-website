import {
  HStack,
  Link,
  LinkProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'
import Icon from 'components/Icon'
import React from 'react'
import styles from './navLink.module.scss'

interface NavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon: string
  href?: string
  isCollapsed: boolean
  onClick?: () => void
  isChild?: boolean
  hasChildExpand?: boolean
  hasChildClose?: boolean
  disabled?: boolean
}

const NavLink = (props: NavLinkProps) => {
  const {
    icon,
    isActive,
    label,
    href,
    isCollapsed,
    onClick,
    isChild,
    hasChildExpand,
    hasChildClose,
    disabled = false
  } = props

  return (
    <Popover placement="right-start" closeOnBlur={false} isLazy={true} trigger="hover">
      <PopoverTrigger>
        <Link
          className={disabled ? styles.disabled : undefined}
          display="block"
          onClick={disabled ? undefined : onClick}
          paddingY={3}
          paddingLeft={isChild ? 12 : 4}
          paddingRight={4}
          href={href}
          borderRadius="md"
          transition="all 0.3s"
          fontWeight="600"
          fontSize={isChild ? '14px' : '16px'}
          lineHeight="1.5rem"
          aria-current={isActive ? 'page' : undefined}
          color="whiteAlpha.900"
          _focus={{ outlineColor: 'teal.400' }}
          _hover={
            isChild
              ? {
                  bg: 'blackAlpha.400',
                  color: 'white'
                }
              : {
                  bg: 'teal.700',
                  color: 'white'
                }
          }
          _activeLink={
            isChild
              ? {
                  bg: 'blackAlpha.400',
                  color: 'white'
                }
              : {
                  bg: 'teal.100',
                  color: 'gray.700'
                }
          }
        >
          <HStack spacing={3}>
            {!isChild && (
              <Icon iconName={icon} size={20} className={!isActive ? 'icon-filter-white' : 'icon-filter-active'} />
            )}
            {!isCollapsed && (
              <Text as="span" flexGrow={1} transition="all 250ms">
                {label}
              </Text>
            )}
            {(hasChildClose || hasChildExpand) && !isCollapsed && (
              <Icon
                iconName={hasChildClose ? 'black-right-arrow.svg' : 'black-down-arrow.svg'}
                size={20}
                className={!isActive ? 'icon-filter-white' : 'icon-filter-active'}
              />
            )}
          </HStack>
        </Link>
      </PopoverTrigger>
      <PopoverContent
        marginLeft={3}
        className={hasChildClose || hasChildExpand ? styles.popoverMenuContentWrapper : styles.popoverContentWrapper}
        display={disabled || !isCollapsed ? 'none' : 'inline-block'}
        _focus={{ outline: '0' }}
        marginTop={hasChildClose || hasChildExpand ? 0 : '3px'}
        width="max-content"
      >
        {!hasChildClose && !hasChildExpand && <PopoverArrow className={styles.popoverArrow} />}
        <PopoverBody
          borderRadius={4}
          className={hasChildClose || hasChildExpand ? styles.popoverMenuContentWrapper : styles.popoverContentWrapper}
          lineHeight={5}
          fontWeight="400"
        ></PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default NavLink
