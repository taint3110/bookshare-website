import { Box as CkBox, HStack, Stack, VStack } from '@chakra-ui/react'
import { getDesktopFooterLinks, getLocationFooterLinks, getTabletFooterLinks } from 'components/Footer/utils'
import Icon from 'components/Icon'
import NextLink from 'components/NextLink'
import dayjs from 'dayjs'
import { IFooterNavLink, IFooterNavLinkItem } from 'interfaces/navigation'
import { getValidArray } from 'utils/common'
import { ISocialLink, socialLinks, tabletFooterLinks, usefullLinks } from '../../constants'
import {
  Box,
  CommonDivider,
  Container,
  FooterColumn,
  NavigationLink,
  NavigationSection,
  SocialButton,
  Text,
  Title
} from '../../footer.styles'

const FooterDesktop = () => {
  return (
    <CkBox as="footer" background="background.primary" display={{ base: 'none', md: 'block' }}>
      <Container>
        <NavigationSection>
          <NavigationLink columns={{ md: 2, lg: 3 }} spacing={10}>
            {getValidArray(tabletFooterLinks).map((footer: IFooterNavLink, indexFooter: number) => (
              <Stack
                key={indexFooter}
                flexDirection={{ base: 'column', lg: 'row' }}
                spacing={8}
                display={{ lg: 'none' }}
              >
                <FooterColumn>
                  <Title lineHeight={7}>{footer.title}</Title>
                  <Stack as="ul" listStyleType="none" spacing={4}>
                    {getValidArray(footer.links).map((link: IFooterNavLinkItem, index: number) => (
                      <CkBox as="li" key={index}>
                        <NextLink href={link.link}>
                          <Text>{link.text}</Text>
                        </NextLink>
                      </CkBox>
                    ))}
                  </Stack>
                </FooterColumn>
              </Stack>
            ))}
            <Stack flexDirection={{ base: 'column', lg: 'row' }} spacing={8} display={{ md: 'none', lg: 'block' }}>
              <FooterColumn>
                <Title lineHeight={7}>{usefullLinks.title}</Title>
                <Stack as="ul" listStyleType="none" spacing={4}>
                  {getValidArray(usefullLinks.links).map((link: IFooterNavLinkItem, index: number) => (
                    <CkBox as="li" key={index}>
                      <NextLink href={link.link}>
                        <Text>{link.text}</Text>
                      </NextLink>
                    </CkBox>
                  ))}
                </Stack>
              </FooterColumn>
            </Stack>

            <Stack flexDirection={{ base: 'row', lg: 'column' }} spacing={8} display={{ base: 'none', lg: 'flex' }}>
              {getValidArray(getDesktopFooterLinks()).map((footer: IFooterNavLink, indexFooter: number) => (
                <FooterColumn key={indexFooter}>
                  <Title lineHeight={7}>{footer.title}</Title>
                  <Stack as="ul" listStyleType="none" spacing={4}>
                    {getValidArray(footer.links).map((link: IFooterNavLinkItem, index: number) => (
                      <CkBox as="li" key={index}>
                        <NextLink href={link.link}>
                          <Text>{link.text}</Text>
                        </NextLink>
                      </CkBox>
                    ))}
                  </Stack>
                </FooterColumn>
              ))}
            </Stack>
          </NavigationLink>
          <VStack spacing={8} flex={0} marginTop={{ md: 10, lg: 0 }}>
            <VStack spacing={4} alignItems="flex-start">
              {/* <a href="mailto:info@bookshare.com"> */}
              <a href="mailto:21521087@gm.uit.edu.com">
                <HStack spacing={2}>
                  <Text isTitle>General:</Text>
                  <Text>info@bookshare.com</Text>
                </HStack>
              </a>
              {/* <a href="mailto:invest@bookshare.com"> */}
              <a href="mailto:21521087@gm.uit.edu.com">
                <HStack spacing={2}>
                  <Text isTitle>Investing:</Text>
                  <Text>invest@bookshare.com</Text>
                </HStack>
              </a>
              <HStack spacing={2} alignItems="flex-start">
                <NextLink href="https://goo.gl/maps/XuxndNZu2BAMf6rJ7">
                  <Text>BookShare, Prairie Village, KS 66208, United States</Text>
                </NextLink>
              </HStack>
            </VStack>
          </VStack>
        </NavigationSection>
        <CommonDivider />
        <Box>© Copyright {dayjs().year()} BookShare, Inc.</Box>
      </Container>
    </CkBox>
  )
}

export default FooterDesktop
