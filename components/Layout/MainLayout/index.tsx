import Footer from 'components/Footer'
import Header from 'components/Header'
import { observer } from 'mobx-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface IMainLayoutProps {
  title?: string
  children?: ReactNode
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    title,
    children,
  } = props
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title || 'BookShare'}</title>
        <link rel="icon" href="/favicon_black.png" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer.Desktop />
      <Footer.Mobile  />
    </>
  )
}

export default observer(MainLayout)
