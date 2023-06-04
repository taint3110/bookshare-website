export interface INavLinkItem {
  text: string
  link: string
  internal?: boolean
}

export interface INavLink {
  text: string
  link?: string
  type: string
  items?: INavLinkItem[]
  internal?: boolean
}

export interface IFooterNavLinkItem {
  link: string
  text: string
}

export interface IFooterNavLink {
  title: string
  links: IFooterNavLinkItem[]
}
