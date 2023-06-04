import { chakra, Text as CkText, Box } from '@chakra-ui/react'
import { BaseStyle } from 'types'
import chakraShouldForwardProp from 'utils/chakraShouldForwardProp'

export const Title = chakra(CkText, {
  baseStyle: () => ({
    ontSize: 'lg',
    paddingTop: { base: 0, md: 4 },
    color: 'gray.700',
    lineHeight: 7,
    fontWeight: 600
  })
})

export const FormConTent = chakraShouldForwardProp(Box, (props: BaseStyle) => ({
  paddingX: { base: 0, md: 2, lg: props.isCMS ? 6 : 2 },
  maxWidth: '5xl',
  marginY: '8px',
  marginLeft: props?.isCMS ? { base: 0, md: 4, lg: 'auto' } : 'auto',
  marginRight: props?.isCMS ? { base: 4, md: 4, lg: 'auto' } : 'auto'
}))
