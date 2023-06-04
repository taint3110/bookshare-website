import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { getTheme } from 'theme'

const CustomApp = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <ChakraProvider theme={getTheme()}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme="colored" />
    </ChakraProvider>
  )
}

export default CustomApp
