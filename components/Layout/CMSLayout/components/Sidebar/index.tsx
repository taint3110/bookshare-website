import { Box, Center, Divider, Flex, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { CMSPageName as PageName } from 'components/pages/CMS/constant'
import { useRouter } from 'next/router'
import { RefObject, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import routes from 'routes'
import { maxMobileWidth, maxTabletWidth } from 'theme/globalStyles'
import NavLink from '../NavLink'

interface ISidebarProps {
  sideBarRef: RefObject<HTMLDivElement>
  isCollapsed: boolean
  setIsCollapsed: (newIsCollapsed: boolean) => void
}
const SideBar = (props: ISidebarProps) => {
  const { isCollapsed, setIsCollapsed, sideBarRef } = props
  const [isOpenOwnerInformation, setIsOpenOwnerInformation] = useState<boolean>(false)
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(false)
  const isMobile: boolean = useMediaQuery({ maxWidth: maxMobileWidth })
  const isTabletMobile: boolean = useMediaQuery({ maxWidth: maxTabletWidth })
  const router = useRouter()
  const { route } = router
  function getLinkProps(href: string, root?: string) {
    return {
      isActive: route.includes(root ?? href),
      href,
      isCollapsed
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (isMobile && sideBarRef?.current && !sideBarRef?.current.contains(event.target as Node)) {
      setIsCollapsed(true)
    }
  }

  function handleToggleOwnerInformation(): void {
    if (!isOpenOwnerInformation && isOpenApplication) {
      // * INFO: Collapse open application dropdown
      setIsOpenApplication(false)
    }
    setIsOpenOwnerInformation(!isOpenOwnerInformation)
  }

  function handleToggleApplication(): void {
    if (!isOpenApplication && isOpenOwnerInformation) {
      // * INFO: Collapse open owner information dropdown
      setIsOpenOwnerInformation(false)
    }
    setIsOpenApplication(!isOpenApplication)
  }

  useEffect(() => {
    if (isMobile || isTabletMobile) {
      setIsCollapsed(isMobile || isTabletMobile)
    }
  }, [isMobile, isTabletMobile])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isMobile])

  useEffect(() => {
    if (route.includes('owner-portal-information') && !isOpenOwnerInformation) {
      handleToggleOwnerInformation()
    }
    if (route.includes('application') && !isOpenApplication) {
      handleToggleApplication()
    }
  }, [])

  return (
    <Flex
      height="full"
      width={isCollapsed ? 20 : 'xs'}
      display={{ base: isCollapsed ? 'none' : 'flex', md: 'flex' }}
      justifyContent="space-between"
      flexDirection="column"
      ref={sideBarRef}
      background="teal.900"
      color="white"
      zIndex="1000"
      position={{ base: 'absolute', md: 'fixed' }}
    >
      <Box marginX="auto" marginY={isCollapsed ? 5 : 6} paddingX={6} height={isCollapsed ? 8 : 6} textAlign="center">
        <Image
          alt="bookshare_logo.svg"
          src={`/assets/icons/${isCollapsed ? 'bookshare_logo.svg' : 'bookshare_logo.svg'}`}
          width={isCollapsed ? 6 : '159px'}
          height={isCollapsed ? 8 : 6}
        />
      </Box>
      <Divider borderColor="whiteAlpha.400" />
      <VStack className="hideScrollBar" display="flex" height="full" overflowY="scroll" paddingBottom={6} paddingX={3}>
        <Stack spacing={5} marginX={3} marginY={6} width="full">
          <NavLink label={PageName.BOOK} icon="cms-property.svg" {...getLinkProps(routes.cms.bookManagement.value)} />
          <NavLink label={PageName.ORDER} icon="cms-account.svg" {...getLinkProps(routes.cms.orderManagement.value)} />
          <NavLink
            label={PageName.ACCOUNT}
            icon="cms-account.svg"
            {...getLinkProps(routes.cms.accountManagement.value)}
          />
        </Stack>
      </VStack>
      <Box position="absolute" bottom={0} height={12} width="full" background="teal.900">
        <Center background="blackAlpha.200" height={12} paddingY={3.5}>
          <Text>
            {isCollapsed ? '' : 'App version: '}
            {process.env.REACT_APP_VERSION || ''}
          </Text>
        </Center>
      </Box>
    </Flex>
  )
}

export default SideBar
