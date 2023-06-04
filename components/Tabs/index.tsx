import { Tab, TabList, TabPanel, TabPanels, Tabs as TabsWrapper } from '@chakra-ui/react'
import map from 'lodash/map'
import { ReactNode } from 'react'
import { getValidArray } from 'utils/common'

export interface ITabData {
  label: string
  content: ReactNode
}

export interface ITabsProps {
  data: ITabData[]
  tabIndex?: number
  onChange?: (tabNumber: number) => void
}

const Tabs = (props: ITabsProps) => {
  const { data, tabIndex, onChange } = props
  const headers: string[] = map(data, 'label')
  const contents: ReactNode[] = map(data, 'content')
  return (
    <TabsWrapper
      colorScheme="teal"
      background="gray.50"
      color="gray.600"
      isLazy
      index={tabIndex}
      onChange={onChange}
      borderTop="1px solid #E2E8F0"
    >
      <TabList
        paddingX={8}
        whiteSpace="nowrap"
        position={{ base: 'absolute', md: 'fixed' }}
        top={{ base: '64px', md: '72px' }}
        zIndex={3}
        background="gray.50"
        width="100%"
        height="50px"
      >
        {getValidArray(headers).map((header: string) => (
          <Tab key={`header-${header}`} _focus={{ background: 'none' }}>
            {header}
          </Tab>
        ))}
      </TabList>
      <TabPanels background="gray.100" paddingTop="50px">
        {getValidArray(contents).map((content: ReactNode, index: number) => (
          <TabPanel
            key={`content-${index}`}
            padding={{ base: 6, lg: 8 }}
            paddingLeft={{ base: 7 }}
            paddingTop={{ lg: 6 }}
          >
            {content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabsWrapper>
  )
}

export default Tabs
