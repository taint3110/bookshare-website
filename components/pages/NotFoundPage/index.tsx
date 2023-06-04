import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import routes from 'routes'
const notfoundBackground: string = '/assets/images/404_background.png'

const NotFoundPage = () => {
  const router = useRouter()
  function handleBackToHomeClick() {
    router.replace(routes.home.value)
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box
        background={`url(${notfoundBackground})`}
        backgroundRepeat="no-repeat"
        height="300px"
        width="400px"
        backgroundPosition="center top"
      ></Box>
      <Text textAlign="center" fontWeight="bold" fontSize="36px" lineHeight={10} color="gray.800">
        Oops! Page not found
      </Text>
      <Text textAlign="center" fontSize="md" marginTop={6} color="gray.700">
        {`We couldn't find the page you were looking for.`}
      </Text>
      <Text textAlign="center" fontSize="md" color="gray.700">
        We suggest you back to Home
      </Text>
      <Button
        fontSize="lg"
        marginTop={6}
        background="teal.500"
        color="white"
        lineHeight={7}
        padding="10px"
        paddingInline={6}
        onClick={handleBackToHomeClick}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFoundPage
