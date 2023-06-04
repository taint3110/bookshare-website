import { Box } from '@chakra-ui/react'
import { HiX } from 'react-icons/hi'
import HamburgerMenuIcon from '../../../../public/assets/icons/hamburger_menu.svg'
import { MobileContainer, MobileWrapper } from './mobileHamburgerMenu.styles'

interface IMobileHamburgerMenuProps {
  onClick?: VoidFunction
  isOpen: boolean
}

const MobileHamburgerMenu = (props: IMobileHamburgerMenuProps) => {
  const { onClick, isOpen } = props

  return (
    <MobileWrapper>
      <MobileContainer as="button" onClick={onClick}>
        {isOpen ? <HiX color="#fff" /> : <HamburgerMenuIcon />}
        <Box srOnly>{isOpen ? 'Close menu' : 'Open menu'}</Box>
      </MobileContainer>
    </MobileWrapper>
  )
}

export default MobileHamburgerMenu
