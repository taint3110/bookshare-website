import { chakra, Text, HStack } from '@chakra-ui/react'

export const IconWithTextWrapper = chakra(HStack, {
  baseStyle: () => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
    '> span': {
      width: 'max-content !important'
    }
  })
})

export const Label = chakra(Text, {
  baseStyle: () => ({
    fontWeight: 500,
    fontSize: 'md',
    lineHeight: 6
  })
})
