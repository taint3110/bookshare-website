import { NavLink } from 'enums/theme'
import { IMetro } from 'interfaces/metro'
import { INavLink, INavLinkItem } from 'interfaces/navigation'
import routes from 'routes'
import { getValidArray } from 'utils/common'

export function getMetroItems(metroList?: IMetro[]): INavLinkItem[] {
  const metroItems: INavLinkItem[] = getValidArray(metroList).map((metro: IMetro) => {
    return {
      text: metro?.name ?? '',
      link: `${routes.home.value}?metro=${encodeURIComponent(metro.name ?? '')}`,
      internal: true
    }
  })
  return metroItems
}

export function getNavLinks(metroList?: IMetro[]): INavLink[] {
  const navLinks: INavLink[] = [
    // {
    //   type: NavLink.DROPDOWN,
    //   text: 'Lease A Room',
    //   items: getMetroItems(metroList)
    // },
    // {
    //   type: NavLink.EMPTY_DROPDOWN,
    //   text: 'List Your Home',
    //   link: `${process.env.FE_BASE_URL}?placeType=entire-house`
    // },
    {
      type: NavLink.BUTTON,
      link: 'https://github.com/taint3110/bookshare ',
      text: 'Go to cart'
    },
    {
      type: NavLink.BUTTON,
      text: 'User Name',
      link: '/'
    }
  ]

  return navLinks
}
