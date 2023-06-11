import { Link } from '@chakra-ui/react'
import Icon from 'components/Icon'
import { EnvironmentEnum } from 'enums/common'
import { EBreakPoint } from 'enums/theme'
import useBreakPoint from 'hooks/useBreakPoint'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import routes from 'routes'
import MobileHamburgerMenu from './components/MobileHamburgerMenu'
import NavbarDesktop from './components/Navbar/components/NavbarDesktop'
import NavbarMobile from './components/Navbar/components/NavbarMobile'
import { getNavLinks } from './components/Navbar/utils'
import { Container, HeaderWrapper } from './header.styles'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [redirectLink, setRedirectLink] = useState<string>('')
  const isDesktop = useBreakPoint(EBreakPoint.LG)
  const isMobile: boolean = useBreakPoint(EBreakPoint.BASE, EBreakPoint.MD)
  const redirectLinkToStaging: string = 'https://staging.livehomeroom.com/'
  const redirectLinkToProduction: string = 'https://livehomeroom.com/'

  function toggle() {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isDesktop])

  const router = useRouter()

  function goHomePage(): void {
    router.push(routes.home.value)
  }

  function getRedirectLink(): string {
    if (process.env.REACT_APP_FLAGS_CTX_APP_NAME === EnvironmentEnum.STAGING) {
      return redirectLinkToStaging
    }
    if (process.env.REACT_APP_FLAGS_CTX_APP_NAME === EnvironmentEnum.PRODUCTION) {
      return redirectLinkToProduction
    }
    return '/'
  }

  useEffect(() => {
    const finalRedirectLink: string = getRedirectLink()
    setRedirectLink(finalRedirectLink)
  }, [])

  return (
    <Container>
      <HeaderWrapper>
        <Link
          isExternal
          href={redirectLink}
          height={isMobile ? '24px' : '33px'}
          marginY={{ base: 2, md: 1, lg: 0 }}
          _focus={{ boxShadow: 'none' }}
        >
          <Icon
            alt="logo"
            width={isMobile ? 162.46 : 223}
            height={isMobile ? 24 : 33}
            onClick={goHomePage}
            iconName={'bookshare_logo.svg'}
            className="header-logo"
          />
        </Link>
        <MobileHamburgerMenu isOpen={isMenuOpen} onClick={toggle} />
        <NavbarMobile navLinks={getNavLinks()} isOpen={isMenuOpen} toggle={toggle} />
        <NavbarDesktop navLinks={getNavLinks()} />
      </HeaderWrapper>
    </Container>
  )
}
export default Header
