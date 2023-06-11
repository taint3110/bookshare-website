import {
  chakra,
  Box as CkBox,
  Text as CkText,
  Button as CkButton,
  ModalHeader as CkModalHeader,
  ModalContent as CkModalContent,
  ModalFooter as CkModalFooter
} from '@chakra-ui/react'
import { EZIndexLayer } from 'enums/theme'

export const Container = chakra(CkBox, {
  baseStyle: () => ({
    background: 'white',
    position: 'sticky',
    zIndex: EZIndexLayer.FILTER_BAR,
    top: '64px'
  })
})

export const Text = chakra(CkText, {
  baseStyle: () => ({
    fontSize: 'lg',
    lineHeight: 7,
    color: 'gray.500',
    fontWeight: 600,
    marginInlineEnd: { base: '0.75rem !important', md: '1.5rem !important' }
  })
})

export const ModalHeader = chakra(CkModalHeader, {
  baseStyle: () => ({
    boxShadow: 'base',
    marginBottom: '1px'
  })
})

export const ButtonApplyFilter = chakra(CkButton, {
  baseStyle: () => ({
    width: '50%',
    background: 'teal.500',
    color: '#fff',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      background: 'teal.600',
      transition: 'all 0.2s ease-in-out'
    },
    _active: {
      background: 'teal.700',
      transition: 'all 0.2s ease-in-out'
    }
  })
})

export const ModalContent = chakra(CkModalContent, {
  baseStyle: () => ({
    marginTop: 0
  })
})

export const ModalFooter = chakra(CkModalFooter, {
  baseStyle: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  })
})
