import { chakra, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const ButtonWithIconWrapper = styled(
  chakra(Box, {
    baseStyle: () => ({
      display: 'flex',
      flexDirection: 'row',
      justifycontent: 'center',
      alignItems: 'center',
      padding: '6px 12px',
      border: '1px solid #E2E8F0',
      boxSizing: 'border-box',
      borderRadius: '6px',
      height: '40px',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        transition: 'all 0.2s ease-in-out',
        backgroundColor: 'gray.100'
      },
      _active: {
        transition: 'all 0.2s ease-in-out',
        backgroundColor: 'gray.200'
      }
    })
  })
)`
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding-left: 12px;
    color: #2d3748;
  }
`
