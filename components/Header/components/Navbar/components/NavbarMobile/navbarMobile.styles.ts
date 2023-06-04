import {
  chakra,
  Flex as CkFlex,
  VStack as CkVStack,
  Text as CkText,
  Button as CkButton,
  DrawerCloseButton as CkDrawerCloseButton
} from '@chakra-ui/react'
import { BaseStyle } from 'types'
import chakraShouldForwardProp from 'utils/chakraShouldForwardProp'

export const Flex = chakra(CkFlex, {
  baseStyle: () => ({
    flexDirection: 'column',
    position: 'absolute',
    insetX: '0',
    zIndex: 10000,
    width: 'full',
    backgroundColor: '#333333',
    padding: 5,
    height: '100%'
  })
})

export const Box = chakra(CkVStack, {
  baseStyle: () => ({
    paddingX: '3',
    top: '64px',
    position: 'relative',
    alignItems: 'stretch'
  })
})

export const Text = chakraShouldForwardProp(CkText, (props: BaseStyle) => ({
  width: 'full',
  fontSize: 'md',
  color: 'teal.50',
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: !props.isDropdownItem ? '32px !important' : 0,
  marginRight: !props.isDropdownItem ? '32px !important' : 0,
  paddingBottom: !props.isDropdownItem ? '22px !important' : 0,
  marginTop: !props.isDropdownItem ? '18px !important' : 0,
  borderBottom: props.hasBorder ? '1px solid rgba(255, 255, 255, 0.24)' : 'none',
  ':hover': {
    color: 'teal.100'
  },
  ':active': {
    color: 'teal.200'
  }
}))

export const Button = chakra(CkButton, {
  baseStyle: () => ({
    height: 12,
    width: '85%',
    marginTop: '36px !important',
    backgroundColor: 'teal.200',
    marginX: 'auto',
    color: 'black',
    '&:hover': {
      backgroundColor: 'teal.300'
    }
  })
})

export const DrawerCloseButton = chakra(CkDrawerCloseButton, {
  baseStyle: () => ({
    size: 'md',
    zIndex: 10001,
    color: 'white',
    width: 12,
    height: 12
  })
})

export const DropdownButton = chakra(CkButton, {
  baseStyle: () => ({
    fontSize: 'md',
    color: 'white',
    justifyContent: 'flex-start',
    padding: 0,
    marginX: '32px !important',
    backgroundColor: 'transparent',
    fontWeight: 600,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    },
    ':active': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    },
    ':focus': {
      boxShadow: 'none'
    },
    '&[data-active]': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    }
  })
})
