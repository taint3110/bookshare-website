import { chakra, HStack as CkHStack, Link as CkLink, Text as CkText, Button as CkButton } from '@chakra-ui/react'
import chakraShouldForwardProp from 'utils/chakraShouldForwardProp'

export const Container = chakra(CkHStack, {
  baseStyle: () => ({
    spacing: '3',
    flex: '1',
    display: { base: 'none', lg: 'flex' },
    justifyContent: 'flex-end',
    gap: '6'
  })
})

export const Link = chakra(CkLink, {
  baseStyle: () => ({
    marginInlineStart: '0px !important'
  })
})

export const Text = chakraShouldForwardProp(CkText, () => ({
  fontSize: 'sm',
  color: 'white',
  fontWeight: 600,
  marginRight: '8',
  marginInlineEnd: '32px !important',
  cursor: 'pointer'
}))

export const Button = chakraShouldForwardProp(CkButton, () => ({
  backgroundColor: 'teal.200',
  color: 'black',
  ':hover': {
    backgroundColor: 'teal.300'
  },
  ':active': {
    backgroundColor: 'teal.400'
  }
}))

export const DropdownButton = chakra(CkButton, {
  baseStyle: () => ({
    fontSize: 'sm',
    color: 'teal.50',
    backgroundColor: 'transparent',
    fontWeight: 600,
    marginInlineStart: '0px !important',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    },
    ':active': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    },
    '&[data-active]': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    }
  })
})
