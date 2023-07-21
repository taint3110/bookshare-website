import { Avatar, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { PLATFORM } from 'API/constants'
import IconWithText from 'components/IconWithText'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import routes from 'routes'

const UserProfile = () => {
  const { name = '', email = '', avatarUrl = '' } = {}
  const router = useRouter()
  const { authStore } = useStores()
  const { route } = router
  const isActive: boolean = route.includes(routes.cms.accountSettings.value)

  function gotoAccountSetting() {
    router.push(routes.cms.accountSettings.value)
  }

  function handleLogout(): void {
    if (router.pathname.includes(routes.myProfile.value)) {
      router.push(routes.home.value)
    }
    authStore.clearAccessToken(PLATFORM.CMS)
    toast.success('Logged out successfully.')
  }

  return (
    <Menu autoSelect={false} computePositionOnMount placement="bottom-end">
      <MenuButton
        _hover={{ backgroundColor: 'gray.50' }}
        _active={{ backgroundColor: 'gray.100' }}
        backgroundColor={isActive ? 'gray.100' : 'transparent'}
        padding="4px 12px"
        borderRadius="6px"
      >
        <HStack spacing={3} order={{ base: 1, md: 2 }} flex="1">
          <Avatar name={name} colorScheme="teal" src={avatarUrl} size="sm" />
          <Flex flexDirection="column" display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
            <Text fontSize="sm" fontWeight="500" lineHeight="5" marginBottom={1}>
              {truncate(name)}
            </Text>
            <Text fontSize="xs" lineHeight="4" color="text.grey.500">
              {email}
            </Text>
          </Flex>
        </HStack>
      </MenuButton>
      <MenuList minWidth="160px">
        <MenuItem maxH="40px" onClick={gotoAccountSetting}>
          <IconWithText
            label="Account Settings"
            iconName="setting.svg"
            size={16}
            className="noMarginBottom"
            color="gray.700"
          />
        </MenuItem>
        <MenuItem maxH="40px" onClick={() => {}}>
          <IconWithText
            label="Log Out"
            onClick={handleLogout}
            iconName="logout.svg"
            size={16}
            className="noMarginBottom"
            color="red.600"
          />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default observer(UserProfile)
