import { Box as CkBox, HStack, VStack } from '@chakra-ui/react'
import Icon from 'components/Icon'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ISocialLink, socialLinks } from '../../constants'
import {
  Box,
  CommonDivider,
  Container,
  NavigationSection,
  SocialButton,
  Text
} from '../../footer.styles'

const FooterMobile = () => {
  const [openIndex, setOpenIndex] = useState<number>(-1)

  function toggleCollapse(index: number) {
    if (openIndex === index) {
      setOpenIndex(-1)
    } else {
      setOpenIndex(index)
    }
  }
  return (
    <CkBox as="footer" background="orange.50" display={{ base: 'block', md: 'none' }}>
      <Container>
        <NavigationSection>
          <VStack spacing={8} flex={0} marginTop={10}>
            <VStack spacing={4} alignItems="flex-start">
              <a href="mailto:info@bookshare.com">
                <HStack spacing={2} flexWrap="wrap">
                  <Text isTitle>General:</Text>
                  <Text>info@bookshare.com</Text>
                </HStack>
              </a>
              <a href="mailto:invest@bookshare.com">
                <HStack spacing={2} flexWrap="wrap">
                  <Text isTitle>Investing:</Text>
                  <Text>invest@bookshare.com</Text>
                </HStack>
              </a>
              <HStack spacing={2} alignItems="flex-start" flexWrap="wrap">
                <Text>BookShare, Prairie Village, KS 66208, United States</Text>
              </HStack>
            </VStack>
            <HStack spacing={4} marginTop={8} alignSelf="flex-start">
              {socialLinks.map((social: ISocialLink) => (
                <SocialButton key={social.label} href={social.href} target="_blank">
                  <Icon size={32} iconName={social.icon} />
                </SocialButton>
              ))}
            </HStack>
          </VStack>
        </NavigationSection>
        <CommonDivider />
        <Box>© Copyright {dayjs().year()} BookShare, Inc.</Box>
      </Container>
    </CkBox>
  )
}

export default FooterMobile
