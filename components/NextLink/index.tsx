import Link from 'next/link'
import { ReactNode } from 'react'

export interface INextLinkProps {
  href?: string
  children?: ReactNode
}

const NextLink = (props: INextLinkProps) => {
  const { href, children } = props
  return (
    <Link href={href ?? '/'} passHref target="_blank" rel="noreferrer">
      {children}
    </Link>
  )
}

export default NextLink
