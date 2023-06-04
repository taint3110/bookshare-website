import { Flex, HStack, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useStores } from 'hooks/useStores'
import truncate from 'lodash/truncate'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { PLATFORM } from 'API/constants'
import IconWithText from 'components/IconWithText'
import routes from 'routes'

const UserProfile = () => {
  const { authStore } = useStores()
  const { user } = authStore
  const { name, email, avatarUrl } = user
  const router = useRouter()
  const { route } = router
  const isActive: boolean = route.includes(routes.cms.accountSettings.value)

  function logout() {
    authStore.clearAccessToken(PLATFORM.CMS)
  }
  function gotoAccountSetting() {
    router.push(routes.cms.accountSettings.value)
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
        <MenuItem maxH="40px" onClick={logout}>
          <IconWithText label="Log Out" iconName="logout.svg" size={16} className="noMarginBottom" color="red.600" />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default observer(UserProfile)
