import {
  chakra,
  Container as CkContainer,
  Box as CkBox,
  Button as CkButton,
  Text as CkText,
  Divider,
  Flex,
  Wrap as CkWrap,
  SimpleGrid as CkSimpleGrid
} from '@chakra-ui/react'
import { BaseStyle } from 'types'
import chakraShouldForwardProp from 'utils/chakraShouldForwardProp'

export const Container = chakraShouldForwardProp(CkContainer, () => ({
  maxWidth: '1248px',
  paddingY: { base: '40px', lg: '64px' },
  paddingX: 8,
  backgroundColor: 'background.primary'
}))

export const Box = chakraShouldForwardProp(CkBox, () => ({
  display: 'flex',
  flexDirection: 'row',
  fontSize: 'md',
  justifyContent: 'center',
  color: 'gray.50'
}))

export const NavigationSection = chakra(Flex, {
  baseStyle: () => ({
    flexDirection: { base: 'column', lg: 'row' },
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  })
})

export const SocialMedia = chakra(CkBox, {
  baseStyle: () => ({
    paddingEnd: '12',
    marginBottom: { base: '10', lg: 0 },
    flex: 0
  })
})

export const SocialButton = chakra('a', {
  baseStyle: {
    rounded: 'lg',
    width: '8',
    height: '8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blackAlpha.500',
    color: 'white',
    transition: 'all 0.2s',
    _hover: {
      transition: 'all 0.2s',
      backgroundColor: 'blackAlpha.900'
    }
  }
})

export const FooterColumn = chakraShouldForwardProp(CkBox, (props: BaseStyle) => ({
  flexDirection: 'column',
  display: props?.isShort ? { base: 'none', md: 'flex', lg: 'none' } : 'flex'
}))

export const PrivacySection = chakra(Flex, {
  baseStyle: () => ({
    marginTop: 10,
    flexDirection: { base: 'column-reverse', lg: 'row' },
    alignItems: { base: 'flex-start', lg: 'center' },
    justifyContent: 'space-between',
    fontSize: 'sm'
  })
})

export const CommonDivider = chakra(Divider, {
  baseStyle: () => ({
    marginY: 10,
    borderColor: 'rgba(255, 255, 255, 0.24)'
  })
})

export const Button = chakra(CkButton, {
  baseStyle: () => ({
    width: '32px',
    minWidth: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  })
})

export const Title = chakraShouldForwardProp(CkText, () => ({
  color: 'white',
  fontWeight: 700,
  fontSize: 'xl',
  whiteSpace: 'nowrap',
  marginBottom: 6
}))

export const DropdownButton = chakra(CkButton, {
  baseStyle: () => ({
    fontSize: 'xl',
    color: 'white',
    justifyContent: 'flex-start',
    paddingX: 0,
    height: '28px',
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
    '&[data-active]': {
      backgroundColor: 'transparent',
      color: 'teal.100'
    }
  })
})

export const Text = chakraShouldForwardProp(CkText, (props: BaseStyle) => ({
  color: 'gray.100',
  fontWeight: props?.isTitle ? 700 : 400,
  fontSize: 'md',
  whiteSpace: props?.isTitle ? 'nowrap' : 'normal',
  ':hover': {
    color: 'gray.200'
  },
  ':active': {
    color: 'gray.300'
  }
}))

export const TextWrapper = chakra(CkBox, {
  baseStyle: () => ({
    '&:hover': {
      '& > a > p': {
        color: 'gray.200'
      }
    },
    '&:active': {
      '& > a > p': {
        color: 'gray.300'
      }
    }
  })
})

export const Wrap = chakra(CkWrap, {
  baseStyle: () => ({
    spacing: { base: '4', lg: '8' },
    marginTop: { base: '4', lg: '0' }
  })
})

export const NavigationLink = chakra(CkSimpleGrid, {
  baseStyle: () => ({
    width: 'full',
    flex: 1,
    fontSize: 'sm'
  })
})
