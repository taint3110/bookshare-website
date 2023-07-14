import Head from 'next/head'
import { ReactNode } from 'react'

interface IAuthenticationLayoutProps {
  title?: string
  children?: ReactNode
}

const AuthenticationLayout = (props: IAuthenticationLayoutProps) => {
  const { title, children } = props
  return (
    <>
      <Head>
        <title>{title || 'HomeRoom'}</title>
        <link rel="icon" href="/favicon_black.png" />
      </Head>
      <main>{children}</main>
    </>
  )
}

export default AuthenticationLayout
