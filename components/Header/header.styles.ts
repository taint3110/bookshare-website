import { chakra, Box as CkBox } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { EZIndexLayer } from 'enums/theme'
import chakraShouldForwardProp from 'utils/chakraShouldForwardProp'

export const Container = chakraShouldForwardProp(CkBox, () => ({
  backgroundColor: 'background.primary',
  width: '100%',
  paddingX: { base: 4, md: 8 },
  zIndex: EZIndexLayer.NAV,
  position: 'sticky',
  top: 0,
  height: '64px'
}))

export const Box = chakraShouldForwardProp(CkBox, () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  boxShadow: 'none',
  backgroundColor: 'transparent'
}))

export const HeaderWrapper = styled(
  chakra(CkBox, {
    baseStyle: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingY: '3',
      position: 'relative'
    })
  })
)`
  img {
    cursor: pointer;
  }
`
