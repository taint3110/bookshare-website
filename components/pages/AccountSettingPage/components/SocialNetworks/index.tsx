import { VStack, Button, HStack, Box } from '@chakra-ui/react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { Title } from '../../accountSettingPage.styles'
import { socialButtonProps } from '../../utils'

function SocialNetworks() {
  return (
    <VStack alignItems="flex-start" spacing={6} hidden={true}>
      <Title>Social Network</Title>
      <HStack
        flexDirection={{ base: 'column', md: 'row' }}
        spacing={{ base: 0, md: 6, lg: 8 }}
        width="full"
        background="white"
        padding={{ base: 4, md: 8 }}
        borderRadius="8px"
      >
        <Button
          {...socialButtonProps('blue')}
          background="blue.600"
          leftIcon={<Box as={FaFacebook} size="20" color="white" />}
        >
          Login with Facebook
        </Button>
        <Button
          {...socialButtonProps('red')}
          background="red.500"
          _hover={{ bg: 'red.700' }}
          _active={{ bg: 'red.700' }}
          leftIcon={<Box as={FaGoogle} size="20" color="white" />}
        >
          Login with Google
        </Button>
      </HStack>
    </VStack>
  )
}

export default SocialNetworks
