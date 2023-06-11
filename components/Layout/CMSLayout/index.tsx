import { Box, Flex } from '@chakra-ui/layout'
import { LocalStorageKeyEnum } from 'enums/common'
import Head from 'next/head'
import { ReactNode, RefObject, useRef, useState } from 'react'
import { CMSLayoutContext } from './cmsLayout.context'
import SideBar from './components/Sidebar'
import TopBar from './components/TopBar'

interface ICMSLayoutProps {
  title?: string
  children?: ReactNode
  topBarTitle: string
}

const CMSLayout = (props: ICMSLayoutProps) => {
  const { title, children, topBarTitle } = props
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false)
  const sideBarRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  function setIsCollapsed(newIsCollapsed: boolean): void {
    setIsCollapsedState(newIsCollapsed)
    sessionStorage.setItem(LocalStorageKeyEnum.IS_SIDEBAR_COLLAPSED, newIsCollapsed.toString())
  }

  return (
    <>
      <Head>
        <title>{title || 'BookShare | Internal Portal'}</title>
        <link rel="icon" href="/favicon_black.png" />
      </Head>
      <main>
        <CMSLayoutContext.Provider value={{ isSidebarCollapsed: isCollapsed, sideBarRef }}>
          <Flex backgroundColor="gray.100" minHeight="100vh">
            <SideBar sideBarRef={sideBarRef} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Box flex={1} flexDirection="column" backgroundColor="gray.100">
              <TopBar isCollapsedSidebar={isCollapsed} setIsCollapsedSidebar={setIsCollapsed} title={topBarTitle} />
              <Box
                //* TODO: Fix case mobile later
                marginTop={{ base: -2, md: '72px' }}
                marginLeft={{ md: '80px', lg: isCollapsed ? '80px' : '320px' }}
                marginBottom={{ base: 6, lg: 8 }}
                >
                {children}
              </Box>
            </Box>
          </Flex>
        </CMSLayoutContext.Provider>
      </main>
                </>
  )
}

export default CMSLayout
