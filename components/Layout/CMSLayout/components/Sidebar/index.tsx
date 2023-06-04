import React, { RefObject, useEffect, useState } from 'react'
import { Box, Divider, Flex, Stack, Text, Center, Collapse, VStack, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { maxMobileWidth, maxTabletWidth } from 'theme/globalStyles'
import { CMSApplicationPageName, CMSInformationPageName, CMSPageName as PageName } from 'components/pages/CMS/constant'
import routes from 'routes'
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
          alt="homeroom_logo.svg"
          src={`/assets/icons/${isCollapsed ? 'homeroom_logo.svg' : 'owner_portal_logo.svg'}`}
          width={isCollapsed ? 6 : '159px'}
          height={isCollapsed ? 8 : 6}
        />
      </Box>
      <Divider borderColor="whiteAlpha.400" />
      <VStack className="hideScrollBar" display="flex" height="full" overflowY="scroll" paddingBottom={6} paddingX={3}>
        <Stack spacing={5} marginX={3} marginY={6} width="full">
          <NavLink
            label={PageName.APPLICATION}
            icon="cms-application.svg"
            isActive={route.includes(routes.cms.applicationManagement.value)}
            isCollapsed={isCollapsed}
            onClick={handleToggleApplication}
            hasChildClose={!isOpenApplication}
            hasChildExpand={isOpenApplication}
          />
          <Collapse in={isOpenApplication && !isCollapsed} animateOpacity style={{ marginTop: 8 }}>
            <Box margin={1}>
              <NavLink
                label={CMSApplicationPageName.APPLICANT}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.applicationManagement.applicant.value)}
                isChild
              />
              <NavLink
                label={CMSApplicationPageName.POLICY_SETTING}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.applicationManagement.policySetting.value)}
                isChild
              />
            </Box>
          </Collapse>
          <NavLink
            label={PageName.PROPERTY}
            icon="cms-property.svg"
            {...getLinkProps(routes.cms.propertyManagement.value)}
          />
          <NavLink
            label={PageName.ACCOUNT}
            icon="cms-account.svg"
            {...getLinkProps(routes.cms.accountManagement.value)}
          />
          <NavLink
            label={PageName.GENERAL_SETTINGS}
            icon="cms-general.svg"
            {...getLinkProps(routes.cms.generalSettings.value)}
          />
          <NavLink
            label={PageName.INFORMATION}
            icon="cms-owner.svg"
            isActive={route.includes(routes.cms.ownerPortalInformation.value)}
            isCollapsed={isCollapsed}
            onClick={handleToggleOwnerInformation}
            hasChildClose={!isOpenOwnerInformation}
            hasChildExpand={isOpenOwnerInformation}
            disabled
          />
          <Collapse in={isOpenOwnerInformation && !isCollapsed} animateOpacity style={{ marginTop: 8 }}>
            <Box margin={1}>
              <NavLink
                label={CMSInformationPageName.OWNER}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.ownerPortalInformation.owner.value)}
                isChild
              />
              <NavLink
                label={CMSInformationPageName.FINANCIAL}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.ownerPortalInformation.financial.value)}
                isChild
              />
              <NavLink
                label={CMSInformationPageName.LEASES}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.ownerPortalInformation.lease.value)}
                isChild
              />
              <NavLink
                label={CMSInformationPageName.INVOICE}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.ownerPortalInformation.invoice.value)}
                isChild
              />
              <NavLink
                label={CMSInformationPageName.PAYMENT}
                icon="cms-agent.svg"
                {...getLinkProps(routes.cms.ownerPortalInformation.payment.value)}
                isChild
              />
            </Box>
          </Collapse>
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
