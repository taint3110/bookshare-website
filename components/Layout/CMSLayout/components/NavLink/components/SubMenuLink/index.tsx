import React from 'react'
import { Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export interface SubMenuLinkProps {
  label: string
  href: string
  isActive?: boolean
}

const SubMenuLink = (props: SubMenuLinkProps) => {
  const router = useRouter()
  const { route } = router
  const { label, href, isActive = route.includes(href) } = props

  return (
    <Link
      display="flex"
      borderRadius={4}
      transition="all 0.3s"
      color="whiteAlpha.900"
      width="stretch"
      aria-current={isActive ? 'page' : undefined}
      height="36px"
      href={href}
      _focus={{ outlineColor: 'teal.400' }}
      _hover={{
        bg: 'blackAlpha.400',
        color: 'white'
      }}
      _activeLink={{
        bg: 'blackAlpha.400',
        color: 'white'
      }}
      alignItems="center"
    >
      <Text marginLeft={1} maxWidth="168px" color="#F7FAFC" lineHeight={6} isTruncated>
        {label}
      </Text>
    </Link>
  )
}

export default SubMenuLink
