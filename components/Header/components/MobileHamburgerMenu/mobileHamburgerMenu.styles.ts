import { Box as CkBox, chakra } from '@chakra-ui/react'

export const MobileWrapper = chakra(CkBox, {
  baseStyle: () => ({
    display: { lg: 'none' },
    ms: '-4'
  })
})

export const MobileContainer = chakra(CkBox, {
  baseStyle: () => ({
    padding: '0',
    fontSize: 'xl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  })
})
